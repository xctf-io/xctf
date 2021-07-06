package loggerfx

import (
	"go.uber.org/config"
	"go.uber.org/zap"
)

const loggingConfigKey = "log"

func New(config config.Provider) (*zap.Logger, error) {
	cfg := zap.NewDevelopmentConfig()

	err := config.Get(loggingConfigKey).Populate(&cfg)
	if err != nil {
		return nil, err
	}
	logger, err := cfg.Build()
	if err != nil{
		return nil, err
	}
	return logger, nil
}