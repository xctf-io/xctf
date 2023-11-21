package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Username string
	Id uint32 `gorm:"uniqueIndex;primaryKey"`
	Content string
	Quote string
}

type HighlightArea struct {
	gorm.Model
	Username string
	CommentId uint32
	Height float32
	Width float32
	PageIndex uint32
	Top float32
	Left float32
}