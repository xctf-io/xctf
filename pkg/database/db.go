package database

import (
	"log"

	"github.com/ctfg/ctfg/pkg/models"
	"github.com/glebarez/sqlite"

	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Connected to Database!")
	return db
}

func Migrate(db *gorm.DB) {
	modelsToMigrate := []interface{}{
		&models.User{},
		&models.Challenge{},
		&models.Evidence{},
		&models.EvidenceConnection{},
	}

	for _, model := range modelsToMigrate {
		err := db.AutoMigrate(model)
		if err != nil {
			panic(err)
		}
	}
	log.Println("Database Migration Completed!")
}
