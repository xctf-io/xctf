package bucket

import (
	"context"
	"github.com/google/wire"
	"github.com/pkg/errors"
	"gocloud.dev/blob"
	_ "gocloud.dev/blob/fileblob"
	_ "gocloud.dev/blob/gcsblob"
	"os"
	"os/user"
	"path"
)

var ProviderSet = wire.NewSet(
	NewConfig,
	NewBuilder,
)

type Builder struct {
	Bucket *blob.Bucket
	config Config

	path string
}

func (s *Builder) Dir(name string) *Builder {
	ns := *s
	ns.path = path.Join(s.path, name)
	return &ns
}

func (s *Builder) Build() (string, error) {
	return s.path, EnsureDirExists(s.path)
}

func (s *Builder) File(name string) (string, error) {
	return path.Join(s.path, name), EnsureDirExists(s.path)
}

func NewBuilder(c Config) (*Builder, error) {
	bucket, err := blob.OpenBucket(context.Background(), c.Url.String())
	if err != nil {
		return nil, err
	}
	// TODO breadchris is this always true
	if c.Url.Scheme != "file" {
		bucket = blob.PrefixedBucket(bucket, c.Url.Path)
	}
	return &Builder{
		Bucket: bucket,
		config: c,
		path:   c.Url.Path,
	}, nil
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
