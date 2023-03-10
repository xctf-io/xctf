package pkg

import (
	"context"
	"errors"

	"github.com/ctfg/ctfg/gen/ctfg"
	"github.com/ctfg/ctfg/pkg/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type admin struct {
	db *gorm.DB
}

func (s *admin) UpsertChallenge(ctx context.Context, req *ctfg.UpsertChallengeRequest) (*ctfg.Empty, error) {
	challenge := models.Challenge{
		Name: req.ChallengeName,
		Flag: req.Flag,
	}

	if challenge.Name == "" || challenge.Flag == "" {
		return nil, errors.New("name and flag must be set")
	}

	res := s.db.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "name"}},
		DoUpdates: clause.Assignments(map[string]interface{}{"flag": req.Flag}),
	}).Create(&challenge)
	if res.Error != nil {
		return nil, res.Error
	}
	return &ctfg.Empty{}, nil
}

func (s *admin) DeleteChallenge(ctx context.Context, req *ctfg.DeleteChallengeRequest) (*ctfg.Empty, error) {
	res := s.db.Delete(&models.Challenge{Name: req.ChallengeName})
	if res != nil {
		return nil, res.Error
	}
	return &ctfg.Empty{}, nil
}

func NewAdmin(db *gorm.DB) ctfg.Admin {
	return &admin{
		db: db,
	}
}
