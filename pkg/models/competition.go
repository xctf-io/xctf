package models

import "gorm.io/gorm"

type Competition struct {
	gorm.Model
	Name       string
	Graph      string
	Active     bool
	Challenges []Challenge
}
