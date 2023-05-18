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

func (s* admin) GetTeamsProgress(ctx context.Context, request *ctfg.GetTeamsProgressRequest) (*ctfg.GetTeamsProgressResponse, error) {
	// get all users in the database
	var users []models.User
	resp := s.db.Find(&users)
	var scores []*ctfg.TeamProgress
	if resp.Error != nil {
		return nil, resp.Error
	}
	for _, user := range users {
		// find the number of flags they have
		if user.Type != "admin" {
			var count int64
			s.db.Model(&models.Evidence{}).Where(&models.Evidence{UserID: int(user.ID), IsFlag: true}).Count(&count)

			scores = append(scores, &ctfg.TeamProgress{
				TeamName: user.Username,
				Score:    uint32(count),
			})
		}
	}
	return &ctfg.GetTeamsProgressResponse{
		Teams: scores,
	}, nil
}

func (s* admin) GetAllChallenges(ctx context.Context, request *ctfg.GetAllChallengesRequest) (*ctfg.GetAllChallengesResponse, error) {
	var challenges []models.Challenge
	resp := s.db.Find(&challenges)
	if resp.Error != nil {
		return nil, resp.Error
	}
	var chals []*ctfg.Challenge
	for _, challenge := range challenges {
		chals = append(chals, &ctfg.Challenge{
			Name: challenge.Name,
			Flag: challenge.Flag,
		})
	}
	return &ctfg.GetAllChallengesResponse{
		Challenges: chals,
	}, nil
}

func NewAdmin(db *gorm.DB) ctfg.Admin {
	return &admin{
		db: db,
	}
}
