package kubes

import (
	"go.uber.org/config"
)

type Config struct {
	Enabled          bool   `yaml:"enabled"`
	Container        string `yaml:"container"`
	DefaultNamespace string `yaml:"default_namespace"`
	DefaultIngress   string `yaml:"default_ingress"`
}

func NewDefaultConfig() Config {
	return Config{
		Enabled:          false,
		Container:        "${CONTAINER:\"\"}",
		DefaultNamespace: "${DEFAULT_NAMESPACE:\"challenges\"}",
		DefaultIngress:   "${DEFAULT_INGRESS:\"xctf-ingress\"}",
	}
}

func NewConfig(provider config.Provider) (Config, error) {
	var c Config
	err := provider.Get("kubes").Populate(&c)
	if err != nil {
		return Config{}, err
	}
	return c, nil
}
