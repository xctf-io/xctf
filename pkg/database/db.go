package database

import (
	"log"
	"os"

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
		&models.EvidenceReport{},
		&models.Page{},
	}

	for _, model := range modelsToMigrate {
		err := db.AutoMigrate(model)
		if err != nil {
			panic(err)
		}
	}

	email := os.Getenv("CTFG_ADMIN_EMAIL")
	password := os.Getenv("CTFG_ADMIN_PASSWORD")

	if email != "" && password != "" {
		log.Println("Creating admin user...")

		var user models.User
		res := db.Where(&models.User{Email: email}).First(&user)
		if res.Error != nil {
			user.Email = email
			user.Username = "admin"
			user.HashPassword(password)
			db.Create(&user)
		} else {
			user.HashPassword(password)
			db.Save(&user)
		}
	}

	log.Println("Database Migration Completed!")
}
