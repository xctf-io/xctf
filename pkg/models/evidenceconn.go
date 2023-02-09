package models

import "gorm.io/gorm"

type EvidenceConnection struct {
	gorm.Model
	SourceID      int      `gorm:"index:evidence_connection_idx"`
	Source        Evidence `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	DestinationID int      `gorm:"index:evidence_connection_idx"`
	Destination   Evidence `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	UserID        int      `gorm:"index:evidence_connection_idx"`
	User          User     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
