package models

import "gorm.io/gorm"

type Evidence struct {
	gorm.Model
	Name        string
	ChallengeID *int      `gorm:""`
	Challenge   Challenge `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	UserID      int       `gorm:""`
	User        User
	PositionX   int `gorm:"default:0"`
	PositionY   int `gorm:"default:0"`
	IsFlag      bool `gorm:"default:false"`
}
