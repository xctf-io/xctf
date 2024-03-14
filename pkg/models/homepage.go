package models

import "gorm.io/gorm"

type HomePage struct {
	gorm.Model
	Id      string `gorm:"uniqueIndex"`
	Content string
}
