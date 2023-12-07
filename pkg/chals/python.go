package chals

import (
	"github.com/pkg/errors"
	"github.com/xctf-io/xctf/pkg/gen/plugin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewPythonPlugin(config Config) (plugin.PythonServiceClient, error) {
	conn, err := grpc.Dial(config.PythonPluginURL, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, errors.Wrapf(err, "unable to connect to python server at %s", config.PythonPluginURL)
	}
	client := plugin.NewPythonServiceClient(conn)
	return client, nil
}
