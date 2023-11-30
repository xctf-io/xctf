package bucket

import (
	"go.uber.org/config"
)

const ConfigurationKey = "bucket"

type Config struct {
	LocalName string `yaml:"local_name"`
	Path      string `yaml:"path"`
	URLBase   string `yaml:"url_base"`
}

func NewDefaultConfig() Config {
	return Config{
		LocalName: ".xctf",
		Path:      "",
		URLBase:   "",
	}
}

func NewConfig(config config.Provider) (Config, error) {
	var cfg Config
	err := config.Get(ConfigurationKey).Populate(&cfg)
	if err != nil {
		return Config{}, err
	}
	return cfg, nil
}
