package pkg

import (
	"context"
	"errors"

	"github.com/ctfg/ctfg/gen/ctfg"
	"github.com/ctfg/ctfg/pkg/models"
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
)

type backend struct {
	db *gorm.DB
}

func (b backend) Register(ctx context.Context, request *ctfg.RegisterRequest) (*ctfg.RegisterResponse, error) {
	user := models.User{
		Model:    gorm.Model{},
		Username: request.Username,
		Email:    request.Email,
	}

	err := user.HashPassword(request.Password)
	if err != nil {
		return nil, err
	}

	result := b.db.Create(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &ctfg.RegisterResponse{
		Created: true,
	}, nil
}

func (b backend) Login(ctx context.Context, request *ctfg.LoginRequest) (*ctfg.LoginResponse, error) {
	var user models.User
	resp := b.db.Where(&models.User{Email: request.Email}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}

	err := user.CheckPassword(request.Password)
	if err != nil {
		return nil, errors.New("incorrect password for user")
	}

	SetUserForSession(ctx, user.ID)

	return &ctfg.LoginResponse{
		LoggedIn: true,
	}, nil
}

func (b backend) CurrentUser(ctx context.Context, request *ctfg.CurrentUserRequest) (*ctfg.CurrentUserResponse, error) {
	userID, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var user models.User
	resp := b.db.Where("id = ?", userID).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}

	return &ctfg.CurrentUserResponse{
		Username: user.Username,
	}, nil
}

func (b backend) GetChallenges(ctx context.Context, request *ctfg.GetChallengesRequest) (*ctfg.GetChallengesResponse, error) {
	log.Debug().Msg("GetChallenges is not implemented")
	return &ctfg.GetChallengesResponse{}, nil
}

func (b backend) SubmitFlag(ctx context.Context, request *ctfg.SubmitFlagRequest) (*ctfg.SubmitFlagResponse, error) {
	return &ctfg.SubmitFlagResponse{
		Correct: false,
	}, nil
}

func (b backend) GetDiscoveredEvidence(ctx context.Context, request *ctfg.GetDiscoveredEvidenceRequest) (*ctfg.GetDiscoveredEvidenceResponse, error) {
	userID, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var evidence []models.Evidence
	evResp := b.db.Where(models.Evidence{UserID: int(userID)}).Find(&evidence)
	if evResp.Error != nil {
		return nil, evResp.Error
	}

	var connections []models.EvidenceConnection
	connResp := b.db.Where(models.EvidenceConnection{UserID: int(userID)}).Find(&connections)
	if connResp.Error != nil {
		return nil, connResp.Error
	}

	var discoveredEvidence []*ctfg.Evidence
	for _, ev := range evidence {
		discoveredEvidence = append(discoveredEvidence, &ctfg.Evidence{
			Id:   uint32(ev.ID),
			Name: ev.Name,
		})
	}

	var discoveredConnections []*ctfg.Connection
	for _, conn := range connections {
		discoveredConnections = append(discoveredConnections, &ctfg.Connection{
			Id:          uint32(conn.ID),
			Source:      uint32(conn.SourceID),
			Destination: uint32(conn.DestinationID),
		})
	}

	return &ctfg.GetDiscoveredEvidenceResponse{
		Evidence:    discoveredEvidence,
		Connections: discoveredConnections,
	}, nil
}

func (b backend) SubmitEvidence(ctx context.Context, request *ctfg.SubmitEvidenceRequest) (*ctfg.SubmitEvidenceResponse, error) {
	userID, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	name := request.Evidence

	var chal models.Challenge
	res := b.db.Where(models.Challenge{Flag: request.Evidence}).First(&chal)
	if res.Error == nil {
		// there was no error meaning there is a challenge with this flag
		name = chal.Name
	}

	evidence := models.Evidence{
		Name:      name,
		Challenge: chal,
		User: models.User{
			Model: gorm.Model{
				ID: userID,
			},
		},
	}
	res = b.db.Create(&evidence)
	if res.Error != nil {
		return nil, res.Error
	}

	return &ctfg.SubmitEvidenceResponse{
		Name: name,
	}, nil
}

func (b backend) SubmitEvidenceConnection(ctx context.Context, request *ctfg.SubmitEvidenceConnectionRequest) (*ctfg.SubmitEvidenceConnectionResponse, error) {
	userID, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	// TODO verify source and destination are accessible to the user

	evidenceConn := models.EvidenceConnection{
		SourceID:      int(request.Source),
		DestinationID: int(request.Destination),
		UserID:        int(userID),
	}
	res := b.db.Create(&evidenceConn)
	if res.Error != nil {
		return nil, res.Error
	}

	return &ctfg.SubmitEvidenceConnectionResponse{}, nil
}

func NewBackend(db *gorm.DB) ctfg.Backend {
	return &backend{
		db: db,
	}
}
