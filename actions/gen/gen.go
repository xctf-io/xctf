package gen

//go:generate gqlgenc
//go:generate gofmt -r "Config -> ClientConfig" -w .
//go:generate gqlgen
//go:generate gofmt -r "Config -> ServerConfig" -w .
