package models

import "gorm.io/gorm"

type Writeup struct {
	gorm.Model
	Username string `gorm:"uniqueIndex"`
	Content  string
}
