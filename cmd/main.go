package main

import (
	"fmt"
	"github.com/xctf-io/xctf/client/public"
	"github.com/xctf-io/xctf/pkg"
	"github.com/xctf-io/xctf/pkg/database"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log"
	"log/slog"
	"net/http"
	"os"
)

func startHttpServer(httpApiHandler http.Handler) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	addr := fmt.Sprintf(":%s", port)

	httpServer := &http.Server{
		Addr:    addr,
		Handler: httpApiHandler,
	}

	log.Printf("Listening @ %s", addr)
	if err := httpServer.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		slog.Debug("request", "method", r.Method, "path", r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// TODO breadchris how bad is this? lol
		origin := r.Header.Get("Origin")

		// TODO breadchris this should only be done for local dev
		w.Header().Set("Access-Control-Allow-Origin", origin)

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization, connect-protocol-version")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	db := database.Connect()
	database.Migrate(db)

	//fsys := os.DirFS("client/public")
	httpApiHandler := pkg.NewAPIHandler(public.Assets, db)

	startHttpServer(h2c.NewHandler(corsMiddleware(httpApiHandler), &http2.Server{}))
}
