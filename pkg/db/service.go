package db

import (
	"context"
	"embed"
	"errors"
	"fmt"
	"github.com/benbjohnson/litestream"
	lsgcs "github.com/benbjohnson/litestream/gcs"
	_ "github.com/mattn/go-sqlite3"
	"github.com/xctf-io/xctf/pkg/gen/chalgen"
	"github.com/xctf-io/xctf/pkg/models"
	"google.golang.org/protobuf/encoding/protojson"
	"gorm.io/gorm"
	"log/slog"
	"os"
	"path"
	"strings"

	"github.com/glebarez/sqlite"
	"gorm.io/driver/postgres"
)

//go:embed Home.md
var Home embed.FS

type Service struct {
	c  Config
	DB *gorm.DB
}

func NewGorm(c Config) (*gorm.DB, error) {
	var openedDb gorm.Dialector
	if strings.Contains(c.DSN, "postgres") {
		openedDb = postgres.Open(c.DSN)
	} else {
		dir, _ := path.Split(c.DSN)
		if err := os.MkdirAll(dir, 0755); err != nil {
			return nil, err
		}
		openedDb = sqlite.Open(c.DSN)
	}

	db, err := gorm.Open(openedDb, &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}

func New(c Config) (*Service, error) {
	s := &Service{
		c: c,
	}

	var lsdb *litestream.DB
	if s.c.BackupsEnabled {
		lsdb = litestream.NewDB(s.c.DSN)

		if err := lsdb.Open(); err != nil {
			return nil, err
		}
		replica := s.newReplica(lsdb)
		lsdb.Replicas = append(lsdb.Replicas, replica)
		if err := s.Restore(context.Background(), replica); err != nil {
			return nil, err
		}
	}

	// TODO breadchris gorm must be created after a replication attempt so that an empty database isn't create
	var err error
	if s.DB, err = NewGorm(c); err != nil {
		return nil, err
	}

	if s.c.BackupsEnabled {
		if lsdb == nil {
			return nil, errors.New("lsdb is nil")
		}
		if err = s.registerDBCallbacks(context.Background(), lsdb); err != nil {
			return nil, err
		}
	}

	if err = s.Migrate(); err != nil {
		return nil, err
	}
	slog.Debug("database migrated")
	s.InitializeAdmin()
	return s, nil
}

func (s *Service) GetCurrentCompetition() (string, *chalgen.Graph, error) {
	var comp models.Competition
	res := s.DB.Where(&models.Competition{Active: true}).First(&comp)
	if res.Error != nil {
		return "", nil, res.Error
	}
	unm := protojson.UnmarshalOptions{DiscardUnknown: true}
	var graph chalgen.Graph
	if err := unm.Unmarshal([]byte(comp.Graph), &graph); err != nil {
		return "", nil, res.Error
	}
	return fmt.Sprintf("%d", comp.ID), &graph, nil
}

func (s *Service) Migrate() error {
	modelsToMigrate := []interface{}{
		&models.User{},
		&models.Challenge{},
		&models.Evidence{},
		&models.EvidenceConnection{},
		&models.EvidenceReport{},
		&models.Page{},
		&models.HomePage{},
		&models.Writeup{},
		&models.Comment{},
		&models.HighlightArea{},
		&models.Competition{},
	}

	for _, model := range modelsToMigrate {
		err := s.DB.AutoMigrate(model)
		if err != nil {
			return err
		}
	}

	content, err := Home.ReadFile("Home.md")
	if err != nil {
		panic(err)
	}
	homePage := models.HomePage{
		Id:      "home",
		Content: string(content),
	}
	s.DB.Save(&homePage)
	return nil
}

func (s *Service) InitializeAdmin() {
	if s.c.AdminEmail != "" && s.c.AdminPassword != "" {
		slog.Debug("creating admin user")

		var user models.User
		res := s.DB.Where(&models.User{Email: s.c.AdminEmail}).First(&user)
		if res.Error != nil {
			user.Email = s.c.AdminEmail
			user.Username = "admin"
			user.Type = "admin"
			user.HashPassword(s.c.AdminPassword)
			s.DB.Create(&user)
		} else {
			user.HashPassword(s.c.AdminPassword)
			user.Type = "admin"
			s.DB.Save(&user)
		}
	}
}

func (s *Service) registerDBCallbacks(ctx context.Context, lsdb *litestream.DB) error {
	f := func(tx *gorm.DB) {
		slog.Debug("replicating DB")
		if err := lsdb.Sync(ctx); err != nil {
			slog.Error("failed to sync WAL")
			return
		}
		if err := lsdb.Replicas[0].Sync(ctx); err != nil {
			slog.Error("failed to backup DB")
			return
		}
	}

	if err := s.DB.Callback().Update().Register("update_replicate", f); err != nil {
		return err
	}
	if err := s.DB.Callback().Create().Register("create_replicate", f); err != nil {
		return err
	}
	return nil
}

func (s *Service) newReplica(lsdb *litestream.DB) *litestream.Replica {
	// TODO breadchris support gcs https://litestream.io/guides/gcs/
	c := lsgcs.NewReplicaClient()
	c.Bucket = s.c.Bucket
	c.Path = s.c.BackupName

	//client := lss3.NewReplicaClient()
	//client.Bucket = s.c.Bucket
	//client.Endpoint = s.c.Endpoint
	//client.SkipVerify = true
	//client.ForcePathStyle = true
	//client.AccessKeyID = s.c.AwsAccessKeyID
	//client.SecretAccessKey = s.c.AwsSecretAccessKey

	replica := litestream.NewReplica(lsdb, "gcs")
	replica.Client = c
	return replica
}

func (s *Service) Restore(ctx context.Context, replica *litestream.Replica) (err error) {
	// Skip restore if local database already exists.
	if _, err := os.Stat(replica.DB().Path()); err == nil {
		slog.Warn("local database already exists, skipping restore")
		return nil
	} else if !os.IsNotExist(err) {
		return err
	}

	// Configure restore to write out to DSN path.
	opt := litestream.NewRestoreOptions()
	opt.OutputPath = replica.DB().Path()

	// Determine the latest generation to restore from.
	if opt.Generation, _, err = replica.CalcRestoreTarget(ctx, opt); err != nil {
		return err
	}

	// Only restore if there is a generation available on the replica.
	// Otherwise we'll let the application create a new database.
	if opt.Generation == "" {
		slog.Warn("no generation found, creating new database")
		return nil
	}

	slog.Info("restoring replica for generation", "generation", opt.Generation)
	if err := replica.Restore(ctx, opt); err != nil {
		return err
	}
	slog.Info("restore complete")
	return nil
}
