package main

import (
	"github.com/go-jet/jet/v2/generator/postgres"
	_ "github.com/lib/pq"
)

func main() {
	err := postgres.GenerateDSN(
		"postgres://postgres:password@localhost:5432/ctfg?sslmode=disable",
		"public",
		"./gen",
	)
	if err != nil {
		panic(err)
	}
}
