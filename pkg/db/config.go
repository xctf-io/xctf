package db

import "go.uber.org/config"

type Config struct {
	DSN                string `yaml:"dsn"`
	Backups            bool   `yaml:"backups"`
	Bucket             string `yaml:"bucket"`
	Endpoint           string `yaml:"endpoint"`
	AwsAccessKeyID     string `yaml:"aws_access_key_id"`
	AwsSecretAccessKey string `yaml:"aws_secret_access_key"`
	AdminEmail         string `yaml:"admin_email"`
	AdminPassword      string `yaml:"admin_password"`
}

func NewDefaultConfig() Config {
	return Config{
		DSN:                "${DSN:\"data/xctf.db\"}",
		Backups:            false,
		Bucket:             "${BUCKET:\"xctf\"}",
		Endpoint:           "${ENDPOINT:\"http://localhost:9000\"}",
		AwsAccessKeyID:     "${XCTF_AWS_ACCESS_KEY_ID:\"minio\"}",
		AwsSecretAccessKey: "${XCTF_AWS_SECRET_ACCESS_KEY:\"minio123\"}",
		AdminEmail:         "${XCTF_ADMIN_EMAIL:\"admin@admin.com\"}",
		AdminPassword:      "${XCTF_ADMIN_PASSWORD:\"password\"}",
	}
}

func NewConfig(provider config.Provider) (Config, error) {
	var c Config
	err := provider.Get("db").Populate(&c)
	if err != nil {
		return Config{}, err
	}
	return c, nil
}
