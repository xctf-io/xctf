package config

import (
	"github.com/xctf-io/xctf/pkg/bucket"
	"github.com/xctf-io/xctf/pkg/chals"
	"github.com/xctf-io/xctf/pkg/db"
	"github.com/xctf-io/xctf/pkg/kubes"
	"github.com/xctf-io/xctf/pkg/log"
	"github.com/xctf-io/xctf/pkg/openai"
	"github.com/xctf-io/xctf/pkg/server"
	"go.uber.org/config"
	"log/slog"
	"os"
)

type BaseConfig struct {
	Server server.Config `yaml:"server"`
	DB     db.Config     `yaml:"db"`
	Log    log.Config    `yaml:"log"`
	Kubes  kubes.Config  `yaml:"kubes"`
	Bucket bucket.Config `yaml:"bucket"`
	Chals  chals.Config  `yaml:"chals"`
	OpenAI openai.Config `yaml:"open_ai"`
}

func NewDefaultConfig() BaseConfig {
	return BaseConfig{
		Server: server.NewDefaultConfig(),
		DB:     db.NewDefaultConfig(),
		Log:    log.NewDefaultConfig(),
		Kubes:  kubes.NewDefaultConfig(),
		Bucket: bucket.NewDefaultConfig(),
		Chals:  chals.NewDefaultConfig(),
		OpenAI: openai.NewDefaultConfig(),
	}
}

func New() (config.Provider, error) {
	opts := []config.YAMLOption{
		config.Permissive(),
		config.Expand(os.LookupEnv),
		config.Static(NewDefaultConfig()),
	}
	// TODO breadchris config file location should be more apparent
	if _, err := os.Stat("config.yaml"); err == nil {
		slog.Debug("using config.yaml")
		opts = append(opts, config.File("config.yaml"))
	}
	return config.NewYAML(opts...)
}
