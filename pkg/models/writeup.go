package models

import "gorm.io/gorm"

type Writeup struct {
	gorm.Model
	Username string `gorm:"unique"`
	Content  string
}
