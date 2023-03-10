package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/ctfg/ctfg/client/public"
	"github.com/ctfg/ctfg/gen/ctfg"
	"github.com/ctfg/ctfg/pkg"
	"github.com/ctfg/ctfg/pkg/database"
	"github.com/twitchtv/twirp"
)

func startHttpServer(twirpServer ctfg.TwirpServer, httpApiHandler http.Handler) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	addr := fmt.Sprintf(":%s", port)

	httpServer := &http.Server{
		Addr:    addr,
		Handler: httpApiHandler,
	}

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, os.Interrupt)

	go func(server *http.Server) {
		log.Printf("Listening @ %s", addr)
		if err := server.ListenAndServe(); err != nil {
			log.Fatal(err)
		}
	}(httpServer)

	<-signals
	log.Println("Shutting down http server...")
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*9)
	defer cancel()
	if err := httpServer.Shutdown(ctx); err != nil {
		log.Fatalf("could not cleanly shutdown http server: %v", err)
	}
}

func main() {
	db := database.Connect()
	database.Migrate(db)

	server := pkg.NewBackend(db)
	admin := pkg.NewAdmin(db)

	twirpHandler := ctfg.NewBackendServer(
		server, pkg.NewLoggingServerHooks(), twirp.WithServerPathPrefix("/twirp/backend"),
	)

	adminHandler := ctfg.NewAdminServer(
		admin, pkg.NewLoggingServerHooks(), pkg.NewAdminHooks(db), twirp.WithServerPathPrefix("/twirp/admin"),
	)

	//fsys := os.DirFS("client/public")
	httpApiHandler := pkg.NewAPIHandler(public.Assets, twirpHandler, adminHandler)

	startHttpServer(twirpHandler, httpApiHandler)
}
