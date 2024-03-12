package chals

import "go.uber.org/config"

type Config struct {
	PythonPluginURL string `yaml:"python_plugin_url"`
	Scheme          string `yaml:"scheme"`
}

func NewDefaultConfig() Config {
	return Config{
		PythonPluginURL: "localhost:50051",
		Scheme:          "https",
	}
}

func NewConfig(provider config.Provider) (Config, error) {
	var c Config
	err := provider.Get("chals").Populate(&c)
	if err != nil {
		return Config{}, err
	}
	return c, nil
}
