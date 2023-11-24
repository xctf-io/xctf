package config

import (
	"github.com/xctf-io/xctf/pkg/db"
	"github.com/xctf-io/xctf/pkg/log"
	"github.com/xctf-io/xctf/pkg/server"
	"go.uber.org/config"
	"os"
)

type BaseConfig struct {
	Server server.Config `yaml:"server"`
	DB     db.Config     `yaml:"db"`
	Log    log.Config    `yaml:"log"`
}

func NewDefaultConfig() BaseConfig {
	return BaseConfig{
		Server: server.NewDefaultConfig(),
		DB:     db.NewDefaultConfig(),
		Log:    log.NewDefaultConfig(),
	}
}

func New() (config.Provider, error) {
	opts := []config.YAMLOption{
		config.Permissive(),
		config.Expand(os.LookupEnv),
		config.Static(NewDefaultConfig()),
	}
	return config.NewYAML(opts...)
}
