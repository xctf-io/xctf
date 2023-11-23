package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Id   uint32 `gorm:"uniqueIndex;autoIncrement"`
	Username string
	CommentId uint32
	Content string
	Quote string
}

type HighlightArea struct {
	gorm.Model
	Id    uint32 `gorm:"uniqueIndex;autoIncrement"`
	Username string
	CommentId uint32
	Height float32
	Width float32
	PageIndex uint32
	Top float32
	Left float32
}