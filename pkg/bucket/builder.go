package bucket

import (
	"github.com/google/wire"
	"github.com/pkg/errors"
	"gocloud.dev/blob"
	"gocloud.dev/blob/fileblob"
	"os"
	"os/user"
	"path"
)

var ProviderSet = wire.NewSet(
	NewConfig,
	NewBuilder,
)

type Builder struct {
	*blob.Bucket
	config Config

	path string
}

func (s *Builder) Dir(name string) *Builder {
	ns := *s
	ns.path = path.Join(s.config.Path, name)
	return &ns
}

func (s *Builder) Build() (string, error) {
	return s.path, EnsureDirExists(s.path)
}

func (s *Builder) File(name string) (string, error) {
	return path.Join(s.path, name), EnsureDirExists(s.path)
}

func NewBuilder(config Config) (*Builder, error) {
	var (
		err error
	)
	if config.Path == "" {
		config.Path, err = CreateLocalDir(config.LocalName)
		if err != nil {
			return nil, err
		}
		err = EnsureDirExists(path.Join(config.Path, "bucket"))
		if err != nil {
			return nil, err
		}
	}
	bucket, err := fileblob.OpenBucket(config.Path, &fileblob.Options{
		CreateDir: true,
	})
	if err != nil {
		return nil, err
	}
	return &Builder{
		Bucket: bucket,
		config: config,
		path:   config.Path,
	}, nil
}

func NewTestBuilder() *Builder {
	return &Builder{
		Bucket: nil,
		config: Config{
			LocalName: "test",
			Path:      "",
			URLBase:   "",
		},
		path: "",
	}
}

func EnsureDirExists(p string) error {
	if _, err := os.Stat(p); os.IsNotExist(err) {
		if err := os.MkdirAll(p, 0700); err != nil {
			return errors.Wrapf(err, "could not create folder: %v", p)
		}
	}
	return nil
}

func CreateLocalDir(dirName string) (string, error) {
	u, err := user.Current()
	if err != nil {
		return "", errors.Wrapf(err, "could not get current user")
	}
	p := path.Join(u.HomeDir, dirName)
	return p, EnsureDirExists(p)
}
