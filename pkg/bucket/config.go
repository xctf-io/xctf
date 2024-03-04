package bucket

import (
	"github.com/pkg/errors"
	"go.uber.org/config"
	"net/url"
	"path"
	"path/filepath"
)

const ConfigurationKey = "bucket"

type Config struct {
	Bucket string `yaml:"bucket"`

	// TODO breadchris this might be brittle
	Url *url.URL
}

func NewDefaultConfig() Config {
	return Config{
		// TODO breadchris give option to use local user dir?
		Bucket: "${BUCKET:\"file://data/bucket\"}",
	}
}

func NewConfig(config config.Provider) (Config, error) {
	var c Config
	err := config.Get(ConfigurationKey).Populate(&c)
	if err != nil {
		return Config{}, err
	}
	u, err := url.Parse(c.Bucket)
	if err != nil {
		return Config{}, errors.Wrapf(err, "failed to parse Bucket: %s", c.Bucket)
	}
	var np string
	if u.Scheme == "file" {
		switch u.Host {
		case "data":
			np, err = filepath.Abs(path.Join("data", u.Path))
			if err == nil {
				err = EnsureDirExists(np)
			}
		case "user":
			np, err = CreateLocalDir(u.Path)
		default:
			err = errors.Errorf("unknown host for Bucket: %s", u.Host)
		}
		if err != nil {
			return Config{}, err
		}
	}
	if np != "" {
		u.Path = np
	}
	c.Url = u
	return c, nil
}
