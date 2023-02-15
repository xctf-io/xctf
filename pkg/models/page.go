package models

import "gorm.io/gorm"

type Page struct {
	gorm.Model
	Route   string `gorm:"uniqueIndex"`
	Title   string
	Content string
}
