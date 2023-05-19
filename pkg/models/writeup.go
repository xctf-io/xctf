package models

import "gorm.io/gorm"

type Writeup struct {
	gorm.Model
	UserID uint `gorm:"uniqueIndex"`
	Content  string
}
