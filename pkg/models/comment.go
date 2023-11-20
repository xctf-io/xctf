package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Username string
	Id uint32 `gorm:"uniqueIndex"`
	Content string
	Areas []HighlightArea
	Quote string
}

type HighlightArea struct {
	gorm.Model
	Height int32
	Width int32
	PageIndex uint32
	Top int32
	Left int32
}