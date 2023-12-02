package models

import "gorm.io/gorm"

type Writeup struct {
	gorm.Model
	UserID  uint `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	User    User
	Content string
	Type    string
}
