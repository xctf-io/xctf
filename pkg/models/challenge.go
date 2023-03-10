package models

import "gorm.io/gorm"

type Challenge struct {
	gorm.Model
	Name        string `gorm:"uniqueIndex"`
	Description string
	Value       int
	Flag        string
}
