package pkg

import (
	"context"
	"fmt"
	"github.com/alexedwards/scs/gormstore"
	"github.com/breadchris/scs/v2"
	"github.com/bufbuild/connect-go"
	grpcreflect "github.com/bufbuild/connect-grpcreflect-go"
	"github.com/xctf-io/xctf/gen/xctf/xctfconnect"
	"gorm.io/gorm"
	"io/fs"
	"log"
	"log/slog"
	"net/http"
	"os"
	"strings"
)

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

func NewAPIHandler(assets fs.FS, db *gorm.DB) http.Handler {
	muxRoot := http.NewServeMux()

	interceptors := connect.WithInterceptors(NewLogInterceptor())

	apiRoot := http.NewServeMux()
	apiRoot.Handle(xctfconnect.NewBackendHandler(NewBackend(db), interceptors))
	apiRoot.Handle(xctfconnect.NewAdminHandler(NewAdmin(db), interceptors))

	store = scs.New()
	var err error
	if store.Store, err = gormstore.New(db); err != nil {
		log.Fatal(err)
	}

	reflector := grpcreflect.NewStaticReflector(
		"xctf.Backend",
		"xctf.Admin",
	)
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

	a := http.FS(assets)
	httpFileServer := http.FileServer(a)
	muxRoot.Handle("/", http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		filePath := r.URL.Path
		if strings.Index(r.URL.Path, "/") == 0 {
			filePath = r.URL.Path[1:]
		}

		if strings.Index(r.URL.Path, "/api") == 0 {
			r.URL.Path = r.URL.Path[4:]
			apiRoot.ServeHTTP(rw, r)
			return
		}

		f, err := assets.Open(filePath)
		if os.IsNotExist(err) {
			r.URL.Path = "/"
		}

		if err == nil {
			f.Close()
		}

		log.Printf("%s - err: %v", r.URL.Path, err)

		httpFileServer.ServeHTTP(rw, r)
	}))
	return store.LoadAndSave(muxRoot)
}
