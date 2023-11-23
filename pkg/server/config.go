package server

import "go.uber.org/config"

type Config struct {
	ProxyURL string `yaml:"proxy_url"`
}

func NewDefaultConfig() Config {
	return Config{
		ProxyURL: "http://localhost:8001",
	}
}

func NewConfig(provider config.Provider) (Config, error) {
	var c Config
	err := provider.Get("server").Populate(&c)
	if err != nil {
		return Config{}, err
	}
	return c, nil
}
