package main

import (
	"context"
	"github.com/rs/zerolog/log"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"

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

	_, err = backend.Login(cliCtx.Context, &ctfg.LoginRequest{
		Email:    email,
		Password: password,
	})
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

								client := ctfg.NewAdminJSONClient(url, http.DefaultClient, twirp.WithClientPathPrefix("/twirp/admin"))
								_, err := client.UpsertChallenge(ctx.Context, &ctfg.UpsertChallengeRequest{
									ChallengeName: chal.Name,
									Flag:          chal.Flag,
								})
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
		log.Error().Err(err).Msg("error running app")
	}
}
