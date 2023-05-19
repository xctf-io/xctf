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

	SetUserForSession(ctx, user.ID, user.Type)

	return &ctfg.LoginResponse{
		Username: user.Username,
		UserRole: user.Type,
	}, nil
}

func (b backend) CurrentUser(ctx context.Context, request *ctfg.CurrentUserRequest) (*ctfg.CurrentUserResponse, error) {
	userID, userType, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var pages []models.Page
	resp := b.db.Find(&pages)
	if resp.Error != nil {
		return nil, resp.Error
	}

	var returnedPages []*ctfg.Page
	for _, page := range pages {
		returnedPages = append(returnedPages, &ctfg.Page{
			Route:   page.Route,
			Title:   page.Title,
			Content: page.Content,
		})
	}

	var user models.User
	resp = b.db.Where(&models.User{Model: gorm.Model{ID: userID}}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}

	return &ctfg.CurrentUserResponse{
		Username: user.Username,
		UserRole: userType,
		Pages:    returnedPages,
	}, nil
}

func (b backend) SubmitFlag(ctx context.Context, request *ctfg.SubmitFlagRequest) (*ctfg.SubmitFlagResponse, error) {
	return &ctfg.SubmitFlagResponse{
		Correct: false,
	}, nil
}

func (b backend) GetDiscoveredEvidence(ctx context.Context, request *ctfg.GetDiscoveredEvidenceRequest) (*ctfg.GetDiscoveredEvidenceResponse, error) {
	userID, _, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	// var report models.EvidenceReport
	// b.db.Where(&models.EvidenceReport{UserID: int(userID)}).First(&report)

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

	return &ctfg.GetDiscoveredEvidenceResponse{
		Evidence:    discoveredEvidence,
		Connections: discoveredConnections,
	}, nil
}

func (b backend) SubmitEvidence(ctx context.Context, request *ctfg.SubmitEvidenceRequest) (*ctfg.SubmitEvidenceResponse, error) {
	userID, _, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	name := request.Evidence

	var chal models.Challenge
	res := b.db.Where(models.Challenge{Flag: request.Evidence}).First(&chal)
	if res.Error != nil && request.IsFlag {
		return nil, errors.New("invalid flag")
	}

	// A flag was found for the challenge, set the name to the challenge name
	if res.Error == nil {
		name = chal.Name
	}

	var evidence models.Evidence
	res = b.db.Where(models.Evidence{Name: name, UserID: int(userID)}).First(&evidence)
	if res.Error == nil {
		if request.Remove {
			log.Debug().
				Str("name", name).
				Msg("deleting existing evidence")
			b.db.Delete(&evidence)
		} else {
			log.Debug().
				Str("name", name).
				Msg("updating existing evidence")
			evidence.PositionX = int(request.X)
			evidence.PositionY = int(request.Y)
			b.db.Save(&evidence)
		}
	} else {
		evidence := models.Evidence{
			Name:      name,
			Challenge: chal,
			User: models.User{
				Model: gorm.Model{
					ID: userID,
				},
			},
			IsFlag: request.IsFlag,
		}
		res = b.db.Create(&evidence)
		if res.Error != nil {
			return nil, res.Error
		}
	}

	return &ctfg.SubmitEvidenceResponse{
		Name: name,
	}, nil
}

func (b backend) SubmitEvidenceConnection(ctx context.Context, request *ctfg.SubmitEvidenceConnectionRequest) (*ctfg.SubmitEvidenceConnectionResponse, error) {
	userID, _, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	// TODO verify source and destination are accessible to the user
	evidenceConn := models.EvidenceConnection{
		SourceID:      int(request.Source),
		DestinationID: int(request.Destination),
		UserID:        int(userID),
	}
	res := b.db.Where(evidenceConn).First(&evidenceConn)
	if res.Error != nil {
		res = b.db.Create(&evidenceConn)
		if res.Error != nil {
			return nil, res.Error
		}
	} else {
		if request.Remove {
			res = b.db.Delete(&evidenceConn)
			if res.Error != nil {
				return nil, res.Error
			}
		}
	}

	return &ctfg.SubmitEvidenceConnectionResponse{}, nil
}

func (b backend) SubmitEvidenceReport(ctx context.Context, req *ctfg.SubmitEvidenceReportRequest) (*ctfg.SubmitEvidenceReportRequest, error) {
	userID, _, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var report models.EvidenceReport
	res := b.db.Where(&models.EvidenceReport{UserID: int(userID)}).First(&report)
	if res.Error != nil {
		newReport := &models.EvidenceReport{
			UserID: int(userID),
			URL:    req.Url,
		}
		if res = b.db.Create(&newReport); res.Error != nil {
			return nil, res.Error
		}
		return &ctfg.SubmitEvidenceReportRequest{}, nil
	}

	report.URL = req.Url
	b.db.Save(report)
	return &ctfg.SubmitEvidenceReportRequest{}, nil
}

func (b backend) GetHomePage(ctx context.Context, request *ctfg.GetHomePageRequest) (*ctfg.GetHomePageResponse, error) {
	var homePage models.HomePage
	resp := b.db.First(&homePage)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return &ctfg.GetHomePageResponse{
		Content: homePage.Content,
	}, nil
}

func (b backend) ForgotPassword(ctx context.Context, request *ctfg.ForgotPasswordRequest) (*ctfg.Empty, error) {
	// check if user exists
	var user models.User
	resp := b.db.Where(models.User{Email: request.Email}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return nil, errors.New("not implemented")
}

func NewBackend(db *gorm.DB) ctfg.Backend {
	return &backend{
		db: db,
	}
}
