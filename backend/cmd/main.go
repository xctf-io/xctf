package main

import (
	"github.com/ctfg/ctfg/backend/pkg/actions/submitflag"
	"github.com/rs/zerolog/log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/submitFlag", submitflag.Handler)

	//loggerMiddleware := middleware.Logger(log.Logger)
	//serverMux := loggerMiddleware(mux)

	addr := ":3001"

	log.Info().
		Str("addr", addr).
		Msg("starting server")

	err := http.ListenAndServe(addr, mux)
	log.Err(err).
		Msg("failed starting server")
}
