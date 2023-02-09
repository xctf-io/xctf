package models

import "gorm.io/gorm"

type Challenge struct {
	gorm.Model
	Name        string
	Description string
	Value       int
	Flag        string
}
