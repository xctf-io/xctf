package pkg

import (
	"context"
	"errors"
	"github.com/xctf-io/xctf/gen/xctf"
	"github.com/xctf-io/xctf/gen/xctf/xctfconnect"

	connect "github.com/bufbuild/connect-go"
	"github.com/rs/zerolog/log"
	"github.com/xctf-io/xctf/pkg/models"
	"gorm.io/gorm"
)

type Backend struct {
	db *gorm.DB
}

var _ xctfconnect.BackendHandler = (*Backend)(nil)

func (b *Backend) SubmitEvidence(ctx context.Context, request *connect.Request[xctf.SubmitEvidenceRequest]) (*connect.Response[xctf.SubmitEvidenceResponse], error) {
	userID, _, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	name := request.Msg.Evidence
	if len(name) == 0 {
		return nil, errors.New("evidence name cannot be empty")
	}

	var chal models.Challenge
	res := b.db.Where(models.Challenge{Flag: request.Msg.Evidence}).First(&chal)
	if res.Error != nil && request.Msg.IsFlag {
		return nil, errors.New("invalid flag")
	}

	// A flag was found for the challenge, set the name to the challenge name
	if res.Error == nil {
		name = chal.Name
	}

	var evidence models.Evidence
	res = b.db.Where(models.Evidence{Name: name, UserID: int(userID)}).First(&evidence)
	if res.Error == nil {
		if request.Msg.Remove {
			log.Debug().
				Str("name", name).
				Msg("deleting existing evidence")
			b.db.Delete(&evidence)
		} else {
			log.Debug().
				Str("name", name).
				Msg("updating existing evidence")
			evidence.PositionX = int(request.Msg.X)
			evidence.PositionY = int(request.Msg.Y)
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
			IsFlag: request.Msg.IsFlag,
		}
		res = b.db.Create(&evidence)
		if res.Error != nil {
			return nil, res.Error
		}
	}
	return connect.NewResponse(&xctf.SubmitEvidenceResponse{
		Name: name,
	}), nil
}

func (b *Backend) SubmitEvidenceReport(ctx context.Context, req *connect.Request[xctf.SubmitEvidenceReportRequest]) (*connect.Response[xctf.SubmitEvidenceReportRequest], error) {
	userID, _, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var report models.EvidenceReport
	res := b.db.Where(&models.EvidenceReport{UserID: int(userID)}).First(&report)
	if res.Error != nil {
		newReport := &models.EvidenceReport{
			UserID: int(userID),
			URL:    req.Msg.Url,
		}
		if res = b.db.Create(&newReport); res.Error != nil {
			return nil, res.Error
		}
		return connect.NewResponse(&xctf.SubmitEvidenceReportRequest{}), nil
	}

	report.URL = req.Msg.Url
	b.db.Save(report)
	return connect.NewResponse(&xctf.SubmitEvidenceReportRequest{}), nil
}

func (b *Backend) Register(ctx context.Context, request *connect.Request[xctf.RegisterRequest]) (*connect.Response[xctf.RegisterResponse], error) {
	user := models.User{
		Model:    gorm.Model{},
		Username: request.Msg.Username,
		Email:    request.Msg.Email,
	}
	if len(request.Msg.Password) == 0 || len(request.Msg.Username) == 0 || len(request.Msg.Password) == 0 {
		return nil, errors.New("fields cannot be empty")
	}

	err := user.HashPassword(request.Msg.Password)
	if err != nil {
		return nil, err
	}

	result := b.db.Create(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return connect.NewResponse(&xctf.RegisterResponse{
		Created: true,
	}), nil
}

func (b *Backend) Login(ctx context.Context, request *connect.Request[xctf.LoginRequest]) (*connect.Response[xctf.LoginResponse], error) {
	var user models.User
	resp := b.db.Where(&models.User{Email: request.Msg.Email}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}

	err := user.CheckPassword(request.Msg.Password)
	if err != nil {
		return nil, errors.New("incorrect password for user")
	}

	SetUserForSession(ctx, user.ID, user.Type)

	return connect.NewResponse(&xctf.LoginResponse{
		Username: user.Username,
		UserRole: user.Type,
	}), nil
}

func (b *Backend) Logout(ctx context.Context, request *connect.Request[xctf.Empty]) (*connect.Response[xctf.Empty], error) {
	RemoveUserFromSession(ctx)
	return connect.NewResponse(&xctf.Empty{}), nil
}

func (b *Backend) CurrentUser(ctx context.Context, request *connect.Request[xctf.CurrentUserRequest]) (*connect.Response[xctf.CurrentUserResponse], error) {
	userID, userType, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var pages []models.Page
	resp := b.db.Find(&pages)
	if resp.Error != nil {
		return nil, resp.Error
	}

	var returnedPages []*xctf.Page
	for _, page := range pages {
		returnedPages = append(returnedPages, &xctf.Page{
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

	return connect.NewResponse(&xctf.CurrentUserResponse{
		Username: user.Username,
		UserRole: userType,
		Pages:    returnedPages,
	}), nil
}

func (b *Backend) SubmitFlag(ctx context.Context, request *connect.Request[xctf.SubmitFlagRequest]) (*connect.Response[xctf.SubmitFlagResponse], error) {
	return connect.NewResponse(&xctf.SubmitFlagResponse{
		Correct: false,
	}), nil
}

func (b *Backend) GetDiscoveredEvidence(ctx context.Context, request *connect.Request[xctf.GetDiscoveredEvidenceRequest]) (*connect.Response[xctf.GetDiscoveredEvidenceResponse], error) {
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

	var discoveredEvidence []*xctf.Evidence
	for _, ev := range evidence {
		chalEv := &xctf.Evidence{
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

	var discoveredConnections []*xctf.Connection
	for _, conn := range connections {
		discoveredConnections = append(discoveredConnections, &xctf.Connection{
			Id:          uint32(conn.ID),
			Source:      uint32(conn.SourceID),
			Destination: uint32(conn.DestinationID),
		})
	}

	return connect.NewResponse(&xctf.GetDiscoveredEvidenceResponse{
		Evidence:    discoveredEvidence,
		Connections: discoveredConnections,
	}), nil
}

func (b *Backend) SubmitEvidenceConnection(
	ctx context.Context,
	request *connect.Request[xctf.SubmitEvidenceConnectionRequest],
) (*connect.Response[xctf.SubmitEvidenceConnectionResponse], error) {
	userID, _, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	// TODO verify source and destination are accessible to the user
	evidenceConn := models.EvidenceConnection{
		SourceID:      int(request.Msg.Source),
		DestinationID: int(request.Msg.Destination),
		UserID:        int(userID),
	}
	res := b.db.Where(evidenceConn).First(&evidenceConn)
	if res.Error != nil {
		res = b.db.Create(&evidenceConn)
		if res.Error != nil {
			return nil, res.Error
		}
	} else {
		if request.Msg.Remove {
			res = b.db.Delete(&evidenceConn)
			if res.Error != nil {
				return nil, res.Error
			}
		}
	}
	return connect.NewResponse(&xctf.SubmitEvidenceConnectionResponse{}), nil
}

func (b *Backend) GetHomePage(
	ctx context.Context,
	request *connect.Request[xctf.GetHomePageRequest],
) (*connect.Response[xctf.GetHomePageResponse], error) {
	var homePage models.HomePage
	resp := b.db.First(&homePage)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return connect.NewResponse(&xctf.GetHomePageResponse{
		Content: homePage.Content,
	}), nil
}

func (b *Backend) ForgotPassword(ctx context.Context, request *connect.Request[xctf.ForgotPasswordRequest]) (*connect.Response[xctf.Empty], error) {
	// check if user exists
	var user models.User
	resp := b.db.Where(models.User{Email: request.Msg.Email}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return nil, errors.New("not implemented")
}

func (b *Backend) SubmitWriteup(ctx context.Context, request *connect.Request[xctf.SubmitWriteupRequest]) (*connect.Response[xctf.Empty], error) {
	userId, _, err := GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var user models.User
	resp := b.db.Where(models.User{Model: gorm.Model{ID: userId}}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	user.HasWriteup = true
	resp = b.db.Save(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}

	var writeup models.Writeup
	resp = b.db.Where(models.Writeup{Username: user.Username}).First(&writeup)
	if resp.Error != nil {
		writeup := models.Writeup{
			Username: user.Username,
			Content:  request.Msg.Content,
		}
		resp = b.db.Create(&writeup)
		if resp.Error != nil {
			return nil, resp.Error
		}
	} else {
		writeup.Content = request.Msg.Content
		resp = b.db.Save(&writeup)
		if resp.Error != nil {
			return nil, resp.Error
		}
	}
	return connect.NewResponse(&xctf.Empty{}), nil
}

func NewBackend(db *gorm.DB) *Backend {
	return &Backend{
		db: db,
	}
}
