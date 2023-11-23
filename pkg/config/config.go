package config

import (
	"github.com/xctf-io/xctf/pkg/server"
	"go.uber.org/config"
	"os"
)

type BaseConfig struct {
	Server server.Config `yaml:"server"`
}

func NewDefaultConfig() BaseConfig {
	return BaseConfig{
		Server: server.NewDefaultConfig(),
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
