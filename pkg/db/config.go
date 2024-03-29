package db

import "go.uber.org/config"

type Config struct {
	DSN                          string `yaml:"dsn"`
	BackupName                   string `yaml:"backup_name"`
	Endpoint                     string `yaml:"endpoint"`
	AwsAccessKeyID               string `yaml:"aws_access_key_id"`
	AwsSecretAccessKey           string `yaml:"aws_secret_access_key"`
	AdminEmail                   string `yaml:"admin_email"`
	AdminPassword                string `yaml:"admin_password"`
	GoogleApplicationCredentials string `yaml:"google_application_credentials"`

	BackupsEnabled bool
	BackupsConfig  string `yaml:"backups"`
}

func NewDefaultConfig() Config {
	return Config{
		DSN:                          "${DSN:\"data/xctf.db\"}",
		BackupName:                   "${BACKUP_NAME:\"xctf\"}",
		Endpoint:                     "${ENDPOINT:\"http://localhost:9000\"}",
		AwsAccessKeyID:               "${XCTF_AWS_ACCESS_KEY_ID:\"minio\"}",
		AwsSecretAccessKey:           "${XCTF_AWS_SECRET_ACCESS_KEY:\"minio123\"}",
		AdminEmail:                   "${XCTF_ADMIN_EMAIL:\"admin@admin.com\"}",
		AdminPassword:                "${XCTF_ADMIN_PASSWORD:\"password\"}",
		GoogleApplicationCredentials: "${GOOGLE_APPLICATION_CREDENTIALS:\"\"}",

		BackupsEnabled: false,
		BackupsConfig:  "${BACKUPS:\"false\"}",
	}
}

func NewConfig(provider config.Provider) (Config, error) {
	var c Config
	err := provider.Get("db").Populate(&c)
	if err != nil {
		return Config{}, err
	}
	c.BackupsEnabled = c.BackupsConfig == "true"
	return c, nil
}
