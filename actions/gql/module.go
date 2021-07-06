package gql

import "go.uber.org/fx"

const configKey = "gqlclient"

var Module = fx.Options(
	fx.Provide(
		NewClient,
	),
)
