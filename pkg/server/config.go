package server

import "go.uber.org/config"

type Config struct {
	Port     string `yaml:"port"`
	ProxyURL string `yaml:"proxy_url"`
}

func NewDefaultConfig() Config {
	return Config{
		// TODO breadchris defaults should default to prod
		ProxyURL: "${PROXY_URL:\"http://localhost:8421\"}",
		Port:     "${PORT:\"8000\"}",
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
