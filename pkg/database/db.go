package database

import (
	"log"
	"os"

	"github.com/ctfg/ctfg/pkg/models"
	"github.com/glebarez/sqlite"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	dbType := os.Getenv("DB_TYPE")
	dsn := os.Getenv("DB_DSN")

	var openedDb gorm.Dialector
	if dbType == "postgres" {
		openedDb = postgres.Open(dsn)
	} else {
		openedDb = sqlite.Open("gorm.db")
	}

	db, err := gorm.Open(openedDb, &gorm.Config{})
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
		&models.HomePage{},
		&models.Writeup{},
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
			user.Type = "admin"
			user.HashPassword(password)
			db.Create(&user)
		} else {
			user.HashPassword(password)
			user.Type = "admin"
			db.Save(&user)
		}
	}
	content, err := os.ReadFile("Home.md")
	if err != nil {
		panic(err)
	}
	homePage := models.HomePage{
		Id:	"home",
		Content: string(content),
	}
	db.Save(&homePage)

	log.Println("Database Migration Completed!")
}
