//go:build wireinject
// +build wireinject

package pkg

import (
	"github.com/google/wire"
	urfavcli "github.com/urfave/cli/v2"
)

func Wire(cacheConfig bucket.Config) (*urfavcli.App, error) {
	panic(wire.Build(
		ProviderSet,
	))
}
