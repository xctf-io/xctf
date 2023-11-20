package main

//go:generate npx buf generate proto

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/rs/zerolog/log"
	"github.com/xctf-io/xctf/client/public"
	"github.com/xctf-io/xctf/gen/xctf"
	"github.com/xctf-io/xctf/gen/xctf/xctfconnect"
	"github.com/xctf-io/xctf/pkg"
	"github.com/xctf-io/xctf/pkg/database"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"io/ioutil"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"

	"github.com/protoflow-labs/protoflow/pkg/util/reload"
	"github.com/twitchtv/twirp"
	"github.com/urfave/cli/v2"
)

func liveReload() error {
	// TODO breadchris makes this a config that can be set
	c := reload.Config{
		// TODO breadchris do not hardcode proxy url
		Cmd: []string{"go", "run", "main.go", "--proxy", "http://localhost:8001"},
		// ideally we use tilt here
		Targets:  []string{"pkg", "gen"},
		Patterns: []string{"**/*.go"},
	}
	slog.Debug("starting live reload", "config", fmt.Sprintf("%+v", c))
	// TODO breadchris this code needs to be refactored to use observability
	return reload.Reload(c)
}

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
		slog.Error("failed to start http server", "err", err)
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

func cliLogin(cliCtx *cli.Context) (ctx context.Context, err error) {
	url := cliCtx.String("url")
	email := cliCtx.String("email")
	password := cliCtx.String("password")

	backend := xctfconnect.NewBackendClient(http.DefaultClient, url)

	_, err = backend.Login(cliCtx.Context, connect.NewRequest(&xctf.LoginRequest{
		Email:    email,
		Password: password,
	}))
	if err != nil {
		return cliCtx.Context, err
	}

	headers := http.Header{
		//"session": []string{resp.Session},
	}

	ctx, err = twirp.WithHTTPRequestHeaders(cliCtx.Context, headers)
	return
}

type Challenge struct {
	Name string `yaml:"name"`
	Flag string `yaml:"flag"`
}

func crawlDir(dir string, cb func(chal Challenge) error) error {
	return filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		if info.Name() == "chal.yaml" {
			data, err := ioutil.ReadFile(path)
			if err != nil {
				return err
			}
			var challenge []Challenge
			if err := yaml.Unmarshal(data, &challenge); err != nil {
				return err
			}
			chal := challenge[0]
			log.Info().Str("name", chal.Name).Str("flag", chal.Flag).Msg("found challenge")
			if err = cb(chal); err != nil {
				log.Error().Err(err).Msg("failed to submit challenge")
				return err
			}
		}
		return nil
	})
}

func main() {
	app := &cli.App{
		Name: "xctf",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:  "proxy",
				Usage: "Proxy URL for the frontend. (The url the react app is reachable at.)",
			},
			&cli.BoolFlag{
				Name:  "dev",
				Usage: "Run in development mode.",
			},
		},
		Action: func(c *cli.Context) error {
			proxy := c.String("proxy")
			dev := c.Bool("dev")

			if dev {
				return liveReload()
			}

			db := database.Connect()
			database.Migrate(db)

			//fsys := os.DirFS("client/public")
			httpApiHandler := pkg.NewAPIHandler(public.Assets, db, proxy)

			startHttpServer(h2c.NewHandler(corsMiddleware(httpApiHandler), &http2.Server{}))
			return nil
		},
		Commands: []*cli.Command{
			{
				Name: "manage",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:     "url",
						Required: true,
					},
					&cli.StringFlag{
						Name:     "email",
						Required: true,
					},
					&cli.StringFlag{
						Name:     "password",
						Required: true,
					},
				},
				Subcommands: []*cli.Command{
					{
						Name: "flags",
						Subcommands: []*cli.Command{
							{
								Name: "sync",
								Action: func(ctx *cli.Context) error {
									url := ctx.String("url")
									dir := ctx.Args().First()

									// walk dir looking for files named "chal.yaml"
									// for each file, read the yaml and upsert the challenge
									cb := func(chal Challenge) error {
										if chal.Flag == "" {
											log.Warn().Str("name", chal.Name).Msg("skipping challenge with empty flag")
											return nil
										}

										client := xctfconnect.NewAdminClient(http.DefaultClient, url)
										_, err := client.UpsertChallenge(ctx.Context, connect.NewRequest(&xctf.UpsertChallengeRequest{
											ChallengeName: chal.Name,
											Flag:          chal.Flag,
										}))
										return err
									}
									return crawlDir(dir, cb)
								},
							},
							{
								Name: "add",
								Flags: []cli.Flag{
									&cli.StringFlag{
										Name:     "challenge",
										Required: true,
									},
									&cli.StringFlag{
										Name:     "flag",
										Required: true,
									},
								},
								Action: func(ctx *cli.Context) error {
									url := ctx.String("url")
									name := ctx.String("challenge")
									value := ctx.String("flag")

									client := xctfconnect.NewAdminClient(http.DefaultClient, url)
									_, err := client.UpsertChallenge(ctx.Context, connect.NewRequest(&xctf.UpsertChallengeRequest{
										ChallengeName: name,
										Flag:          value,
									}))
									return err
								},
							},
							{
								Name: "delete",
								Flags: []cli.Flag{
									&cli.StringFlag{
										Name:     "challenge",
										Required: true,
									},
								},
								Action: func(ctx *cli.Context) error {
									url := ctx.String("url")
									name := ctx.String("challenge")

									client := xctfconnect.NewAdminClient(http.DefaultClient, url)
									_, err := client.DeleteChallenge(ctx.Context, connect.NewRequest(&xctf.DeleteChallengeRequest{
										ChallengeName: name,
									}))
									return err
								},
							},
						},
					},
				},
			},
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Error().Err(err).Msg("error running app")
	}
}
