//go:build wireinject
// +build wireinject

package cli

import (
	"github.com/google/wire"
	urfavcli "github.com/urfave/cli/v2"
)

func Wire() (*urfavcli.App, error) {
	panic(wire.Build(
		ProviderSet,
	))
}
