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
			resp = s.db.Model(&models.Evidence{}).Where(&models.Evidence{UserID: int(user.ID), IsFlag: true}).Count(&count)
			if resp.Error != nil {
				return nil, resp.Error
			}

			scores = append(scores, &ctfg.TeamProgress{
				TeamName: user.Username,
				HasWriteup: user.HasWriteup,
				Score:    uint32(count),
				Grade:	uint32(user.Grade),
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

func (s* admin) SetHomePage(ctx context.Context, request *ctfg.SetHomePageRequest) (*ctfg.Empty, error) {
	var homePage models.HomePage
	resp := s.db.First(&homePage)
	if resp.Error != nil {
		return nil, resp.Error
	}
	homePage.Content = request.Content
	resp = s.db.Save(&homePage)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return &ctfg.Empty{}, nil
}

func (s* admin) GetWriteup(ctx context.Context, request *ctfg.GetWriteupRequest) (*ctfg.GetWriteupResponse, error) {
	var writeup models.Writeup
	resp := s.db.Where(&models.Writeup{Username: request.Username}).First(&writeup)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return &ctfg.GetWriteupResponse{
		Content: writeup.Content,
	}, nil
}

func (s *admin) SubmitGrade(ctx context.Context, request *ctfg.SubmitGradeRequest) (*ctfg.Empty, error) {
	var user models.User
	resp := s.db.Where(&models.User{Username: request.Username}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	user.Grade = int(request.Score)
	resp = s.db.Save(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return &ctfg.Empty{}, nil
}

func (s *admin) GetUserGraph(ctx context.Context, request *ctfg.GetUserGraphRequest) (*ctfg.GetUserGraphResponse, error) {
	var user models.User
	resp := s.db.Where(&models.User{Username: request.Username}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	userID := user.ID

	var evidence []models.Evidence
	evResp := s.db.Where(models.Evidence{UserID: int(userID)}).Find(&evidence)
	if evResp.Error != nil {
		return nil, evResp.Error
	}

	var connections []models.EvidenceConnection
	connResp := s.db.Where(models.EvidenceConnection{UserID: int(userID)}).Find(&connections)
	if connResp.Error != nil {
		return nil, connResp.Error
	}

	var discoveredEvidence []*ctfg.Evidence
	for _, ev := range evidence {
		chalEv := &ctfg.Evidence{
			Id:     uint32(ev.ID),
			Name:   ev.Name,
			X:      int32(ev.PositionX),
			Y:      int32(ev.PositionY),
			IsFlag: ev.IsFlag,
		}
		if ev.ChallengeID != nil {
			chalEv.ChallengeID = uint32(*ev.ChallengeID)
		}
		discoveredEvidence = append(discoveredEvidence, chalEv)
	}

	var discoveredConnections []*ctfg.Connection
	for _, conn := range connections {
		discoveredConnections = append(discoveredConnections, &ctfg.Connection{
			Id:          uint32(conn.ID),
			Source:      uint32(conn.SourceID),
			Destination: uint32(conn.DestinationID),
		})
	}

	return &ctfg.GetUserGraphResponse{
		Evidence:    discoveredEvidence,
		Connections: discoveredConnections,
	}, nil
}

func NewAdmin(db *gorm.DB) ctfg.Admin {
	return &admin{
		db: db,
	}
}
