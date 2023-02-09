package main

import (
	"context"
	"flag"
	"github.com/ctfg/ctfg/client/public"
	"github.com/ctfg/ctfg/gen/ctfg"
	"github.com/ctfg/ctfg/pkg"
	"github.com/ctfg/ctfg/pkg/database"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"
)

var (
	httpAddr = flag.String("http-address", ":8000", "Bind address for http server")
)

func startHttpServer(twirpServer ctfg.TwirpServer, httpApiHandler http.Handler) {
	flag.Parse()

	httpServer := &http.Server{
		Addr:    *httpAddr,
		Handler: httpApiHandler,
	}

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, os.Interrupt)

	go func(server *http.Server) {
		log.Printf("Listening @ %s", *httpAddr)
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
	twirpHandler := ctfg.NewBackendServer(server, pkg.NewLoggingServerHooks())

	httpApiHandler := pkg.NewAPIHandler(public.Assets, twirpHandler)
	startHttpServer(twirpHandler, httpApiHandler)
}
