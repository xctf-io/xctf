package models

import "gorm.io/gorm"

type EvidenceReport struct {
	gorm.Model
	UserID int  `gorm:"uniqueIndex"`
	User   User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	URL    string
}
