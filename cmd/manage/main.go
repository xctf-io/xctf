package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/ctfg/ctfg/gen/ctfg"
	"github.com/twitchtv/twirp"
	"github.com/urfave/cli/v2"
)

func cliLogin(cliCtx *cli.Context) (ctx context.Context, err error) {
	url := cliCtx.String("url")
	email := cliCtx.String("email")
	password := cliCtx.String("password")

	hooks := twirp.ClientHooks{
		ResponseReceived: func(c context.Context) {
			l := c.Value("Login")
			log.Printf("%+v", l)
		},
	}

	backend := ctfg.NewBackendJSONClient(url, http.DefaultClient, twirp.WithClientPathPrefix("/twirp/backend"), twirp.WithClientHooks(&hooks))

	resp, err := backend.Login(cliCtx.Context, &ctfg.LoginRequest{
		Email:    email,
		Password: password,
	})
	if err != nil {
		return cliCtx.Context, err
	}

	headers := http.Header{
		"session": []string{resp.Session},
	}

	ctx, err = twirp.WithHTTPRequestHeaders(cliCtx.Context, headers)
	return
}

func main() {
	app := &cli.App{
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
		Commands: []*cli.Command{
			{
				Name: "flags",
				Subcommands: []*cli.Command{
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

							client := ctfg.NewAdminJSONClient(url, http.DefaultClient, twirp.WithClientPathPrefix("/twirp/admin"))
							_, err := client.UpsertChallenge(ctx.Context, &ctfg.UpsertChallengeRequest{
								ChallengeName: name,
								Flag:          value,
							})
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

							client := ctfg.NewAdminJSONClient(url, http.DefaultClient, twirp.WithClientPathPrefix("admin"))

							_, err := client.DeleteChallenge(ctx.Context, &ctfg.DeleteChallengeRequest{
								ChallengeName: name,
							})
							return err
						},
					},
				},
			},
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
