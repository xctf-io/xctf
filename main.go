package main

//go:generate npm run generate

import (
	_ "github.com/google/wire"
	"github.com/xctf-io/xctf/pkg/cli"
	"log/slog"
	"os"
)

func main() {
	app, err := cli.Wire()
	if err != nil {
		slog.Error("error wiring app", "error", err)
		return
	}
	if err := app.Run(os.Args); err != nil {
		slog.Error("error running app", "error", err)
		return
	}
	println("hello")
}
