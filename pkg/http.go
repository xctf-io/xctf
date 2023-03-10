package pkg

import (
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/ctfg/ctfg/gen/ctfg"

	"gitea.com/go-chi/session"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func NewAPIHandler(assets fs.FS, twirpHandler ctfg.TwirpServer, adminHandler ctfg.TwirpServer) http.Handler {
	muxRoot := chi.NewRouter()

	muxRoot.Use(middleware.RequestID)
	muxRoot.Use(middleware.RealIP)
	muxRoot.Use(middleware.Logger)
	muxRoot.Use(session.Sessioner(session.Options{
		Provider:           "file",
		CookieName:         "session",
		FlashEncryptionKey: "SomethingSuperSecretThatShouldChange",
	}))

	//muxRoot.Use(middleware.Recoverer)
	muxRoot.Use(middleware.Timeout(time.Second * 5))

	fs := http.FS(assets)
	httpFileServer := http.FileServer(fs)

	muxRoot.Handle("/*", http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, twirpHandler.PathPrefix()) {
			twirpHandler.ServeHTTP(rw, r)
			return
		}

		if strings.HasPrefix(r.URL.Path, adminHandler.PathPrefix()) {
			adminHandler.ServeHTTP(rw, r)
			return
		}

		filePath := r.URL.Path
		if strings.Index(r.URL.Path, "/") == 0 {
			filePath = r.URL.Path[1:]
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
	return muxRoot
}
