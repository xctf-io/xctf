package server

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	grpcreflect "github.com/bufbuild/connect-grpcreflect-go"
	"github.com/google/uuid"
	"github.com/google/wire"
	"github.com/samber/lo"
	"github.com/xctf-io/xctf/client/public"
	"github.com/xctf-io/xctf/pkg/admin"
	"github.com/xctf-io/xctf/pkg/backend"
	"github.com/xctf-io/xctf/pkg/bucket"
	"github.com/xctf-io/xctf/pkg/chals"
	"github.com/xctf-io/xctf/pkg/db"
	"github.com/xctf-io/xctf/pkg/gen/kubes/kubesconnect"
	"github.com/xctf-io/xctf/pkg/gen/xctf/xctfconnect"
	xhttp "github.com/xctf-io/xctf/pkg/http"
	"github.com/xctf-io/xctf/pkg/kubes"
	"github.com/xctf-io/xctf/pkg/openai"
	"io"
	"log/slog"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"
)

var ProviderSet = wire.NewSet(
	NewConfig,
	db.ProviderSet,
	kubes.ProviderSet,
	xhttp.New,
	backend.NewBackend,
	admin.NewAdmin,
	bucket.ProviderSet,
	chals.ProviderSet,
	openai.ProviderSet,
	New,
)

func New(
	c Config,
	store *xhttp.Store,
	k *kubes.Service,
	b *backend.Backend,
	a *admin.Admin,
	s *bucket.Builder,
	h *chals.Handler,
) (http.Handler, error) {
	muxRoot := http.NewServeMux()

	interceptors := connect.WithInterceptors(NewLogInterceptor())

	apiRoot := http.NewServeMux()
	apiRoot.Handle(xctfconnect.NewBackendHandler(b, interceptors))
	apiRoot.Handle(xctfconnect.NewAdminHandler(a, interceptors))
	if k != nil {
		apiRoot.Handle(kubesconnect.NewKubesServiceHandler(k, interceptors))
	}

	playRoot := http.NewServeMux()
	playRoot.Handle(h.Handle())

	services := []string{
		"xctf.Backend",
		"xctf.Admin",
		"kubes.KubesService",
	}

	reflector := grpcreflect.NewStaticReflector(services...)
	recoverCall := func(_ context.Context, spec connect.Spec, _ http.Header, p any) error {
		slog.Error("panic", "err", fmt.Sprintf("%+v", p))
		if err, ok := p.(error); ok {
			return err
		}
		return fmt.Errorf("panic: %v", p)
	}

	muxRoot.Handle(grpcreflect.NewHandlerV1(reflector, connect.WithRecover(recoverCall)))
	// Many tools still expect the older version of the server reflection Service, so
	// most servers should mount both handlers.
	muxRoot.Handle(grpcreflect.NewHandlerV1Alpha(reflector, connect.WithRecover(recoverCall)))

	u, err := url.Parse(c.ProxyURL)
	if err != nil {
		return nil, err
	}
	proxy := httputil.NewSingleHostReverseProxy(u)

	assets := public.Assets
	hfs := http.FS(assets)
	httpFileServer := http.FileServer(hfs)

	muxRoot.Handle("/upload", http.HandlerFunc(fileUploadHandler(s)))

	// TODO breadchris there has to be a better way to handle routes than this
	muxRoot.Handle("/", http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		filePath := r.URL.Path
		if strings.Index(r.URL.Path, "/") == 0 {
			filePath = r.URL.Path[1:]
		}

		if strings.Index(r.URL.Path, "/download") == 0 {
			// Remove "/download/"
			p := r.URL.Path[10:]
			r, err := s.Bucket.NewReader(r.Context(), p, nil)
			if err != nil {
				rw.WriteHeader(http.StatusNotFound)
				slog.Debug("file not found", "err", err)
			}
			defer r.Close()
			_, err = r.WriteTo(rw)
			if err != nil {
				rw.WriteHeader(http.StatusNotFound)
				slog.Debug("failed to write file", "err", err)
			}
			return
		}

		if strings.Index(r.URL.Path, "/api") == 0 {
			r.URL.Path = r.URL.Path[4:]
			apiRoot.ServeHTTP(rw, r)
			return
		}

		if strings.Index(r.URL.Path, "/play") == 0 {
			r.URL.Path = r.URL.Path[5:]
			playRoot.ServeHTTP(rw, r)
			return
		}

		parts := strings.Split(r.URL.Path, "/")
		if len(parts) >= 2 && lo.SomeBy(services, func(service string) bool {
			return service == parts[1]
		}) {
			apiRoot.ServeHTTP(rw, r)
			return
		}

		if c.ProxyURL != "" {
			slog.Debug("proxying request", "path", r.URL.Path)
			proxy.ServeHTTP(rw, r)
		} else {
			f, err := assets.Open(filePath)
			if os.IsNotExist(err) {
				r.URL.Path = "/"
			}
			if err == nil {
				f.Close()
			}
			slog.Debug("serving file", "path", filePath)
			httpFileServer.ServeHTTP(rw, r)
		}
		return
	}))
	return store.LoadAndSave(muxRoot), nil
}

func fileUploadHandler(s *bucket.Builder) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		writeError := func(sc int, err error, msg string, args ...any) {
			slog.Error(msg, "error", err, "args", args)
			http.Error(w, msg, sc)
		}
		if r.Method != http.MethodPut {
			writeError(http.StatusMethodNotAllowed, nil, "Invalid request method", "method", r.Method)
			return
		}

		v := r.URL.Query()

		name := uuid.NewString()
		if n, ok := v["name"]; ok && len(n) == 1 {
			name = n[0]
		}

		slog.Debug("Uploading file", "name", name)

		b, err := io.ReadAll(r.Body)
		if err != nil {
			writeError(http.StatusInternalServerError, err, "Error reading file from form data")
			return
		}
		err = s.Bucket.WriteAll(r.Context(), name, b, nil)
		if err != nil {
			writeError(http.StatusInternalServerError, err, "Error copying the uploaded file")
			return
		}
		slog.Debug("done uploading file", "name", name)
		w.WriteHeader(http.StatusOK)
	}
}

func NewLogInterceptor() connect.UnaryInterceptorFunc {
	interceptor := func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(
			ctx context.Context,
			req connect.AnyRequest,
		) (connect.AnyResponse, error) {
			resp, err := next(ctx, req)
			if err != nil {
				slog.Error("connect error", "err", fmt.Sprintf("%+v", err))
			}
			return resp, err
		}
	}
	return interceptor
}
