package models

import "gorm.io/gorm"

type CompetitionNode struct {
	gorm.Model
	Config    map[string]interface{} `gorm:"type:jsonb"`
	PositionX int                    `gorm:"default:0"`
	PositionY int                    `gorm:"default:0"`
}

type CompetitionEdge struct {
	gorm.Model
	FromID int
	From   CompetitionNode `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	ToID   int
	To     CompetitionNode `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
