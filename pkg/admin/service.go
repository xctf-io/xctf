package admin

import (
	"context"
	"errors"
	"github.com/bufbuild/connect-go"
	"github.com/xctf-io/xctf/pkg/db"
	"github.com/xctf-io/xctf/pkg/gen/xctf"
	"github.com/xctf-io/xctf/pkg/gen/xctf/xctfconnect"

	"github.com/xctf-io/xctf/pkg/models"
	"gorm.io/gorm/clause"
)

type Admin struct {
	db *db.Service
}

func NewAdmin(db *db.Service) *Admin {
	return &Admin{
		db: db,
	}
}

var _ xctfconnect.AdminHandler = &Admin{}

func (s *Admin) Remove(ctx context.Context, c *connect.Request[xctf.RemoveRequest]) (*connect.Response[xctf.RemoveResponse], error) {
	err := s.db.RemoveFile(c.Msg.Path)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(&xctf.RemoveResponse{}), nil
}

func (s *Admin) Readdir(ctx context.Context, c *connect.Request[xctf.ReaddirRequest]) (*connect.Response[xctf.ReaddirResponse], error) {
	fi, err := s.db.Readdir(c.Msg.Path)
	if err != nil {
		return nil, err
	}

	var files []*xctf.FileInfo
	for _, f := range fi {
		files = append(files, &xctf.FileInfo{
			Name:  f.Name(),
			Size:  f.Size(),
			IsDir: f.IsDir(),
		})
	}
	return connect.NewResponse(&xctf.ReaddirResponse{
		Files: files,
	}), nil
}

func (s *Admin) UpsertChallenge(ctx context.Context, req *connect.Request[xctf.UpsertChallengeRequest]) (*connect.Response[xctf.Empty], error) {
	challenge := models.Challenge{
		Name: req.Msg.ChallengeName,
		Flag: req.Msg.Flag,
	}

	if challenge.Name == "" || challenge.Flag == "" {
		return nil, errors.New("name and flag must be set")
	}

	res := s.db.DB.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "name"}},
		DoUpdates: clause.Assignments(map[string]interface{}{"flag": req.Msg.Flag}),
	}).Create(&challenge)
	if res.Error != nil {
		return nil, res.Error
	}
	return connect.NewResponse(&xctf.Empty{}), nil
}

func (s *Admin) DeleteChallenge(ctx context.Context, req *connect.Request[xctf.DeleteChallengeRequest]) (*connect.Response[xctf.Empty], error) {
	res := s.db.DB.Delete(&models.Challenge{Name: req.Msg.ChallengeName})
	if res != nil {
		return nil, res.Error
	}
	return connect.NewResponse(&xctf.Empty{}), nil
}

func (s *Admin) GetTeamsProgress(ctx context.Context, request *connect.Request[xctf.GetTeamsProgressRequest]) (*connect.Response[xctf.GetTeamsProgressResponse], error) {
	// get all users in the database
	var users []models.User
	resp := s.db.DB.Find(&users)
	var scores []*xctf.TeamProgress
	if resp.Error != nil {
		return nil, resp.Error
	}
	for _, user := range users {
		// find the number of flags they have
		if user.Type != "admin" {
			var count int64
			resp = s.db.DB.Model(&models.Evidence{}).Where(&models.Evidence{UserID: int(user.ID), IsFlag: true}).Count(&count)
			if resp.Error != nil {
				return nil, resp.Error
			}

			scores = append(scores, &xctf.TeamProgress{
				TeamName:   user.Username,
				HasWriteup: user.HasWriteup,
				Score:      uint32(count),
				Grade:      uint32(user.Grade),
			})
		}
	}
	return connect.NewResponse(&xctf.GetTeamsProgressResponse{
		Teams: scores,
	}), nil
}

func (s *Admin) GetAllChallenges(ctx context.Context, request *connect.Request[xctf.GetAllChallengesRequest]) (*connect.Response[xctf.GetAllChallengesResponse], error) {
	var challenges []models.Challenge
	resp := s.db.DB.Find(&challenges)
	if resp.Error != nil {
		return nil, resp.Error
	}
	var chals []*xctf.Challenge
	for _, challenge := range challenges {
		chals = append(chals, &xctf.Challenge{
			Name: challenge.Name,
			Flag: challenge.Flag,
		})
	}
	return connect.NewResponse(&xctf.GetAllChallengesResponse{
		Challenges: chals,
	}), nil
}

func (s *Admin) SetHomePage(ctx context.Context, request *connect.Request[xctf.SetHomePageRequest]) (*connect.Response[xctf.Empty], error) {
	var homePage models.HomePage
	resp := s.db.DB.First(&homePage)
	if resp.Error != nil {
		return nil, resp.Error
	}
	homePage.Content = request.Msg.Content
	resp = s.db.DB.Save(&homePage)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return connect.NewResponse(&xctf.Empty{}), nil
}

func (s *Admin) GetWriteup(ctx context.Context, request *connect.Request[xctf.GetWriteupRequest]) (*connect.Response[xctf.GetWriteupResponse], error) {
	// TODO breadchris we should not use usernames here
	// there seems to be some conflation between username and team in the code
	// get userid from username
	var user models.User
	res := s.db.DB.Where(&models.User{Username: request.Msg.Username}).First(&user)
	if res.Error != nil {
		return nil, res.Error
	}

	var writeup models.Writeup
	resp := s.db.DB.Where(&models.Writeup{UserID: user.ID}).First(&writeup)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return connect.NewResponse(&xctf.GetWriteupResponse{
		Content: writeup.Content,
		Type:    writeup.Type,
	}), nil
}

func (s *Admin) SubmitGrade(ctx context.Context, request *connect.Request[xctf.SubmitGradeRequest]) (*connect.Response[xctf.Empty], error) {
	var user models.User
	resp := s.db.DB.Where(&models.User{Username: request.Msg.Username}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	if request.Msg.Score < 1 || request.Msg.Score > 100 {
		return nil, errors.New("grade must be between 1 and 100")
	}
	user.Grade = int(request.Msg.Score)
	resp = s.db.DB.Save(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return connect.NewResponse(&xctf.Empty{}), nil
}

func (s *Admin) SubmitComment(ctx context.Context, request *connect.Request[xctf.SubmitCommentRequest]) (*connect.Response[xctf.Empty], error) {
	for _, area := range request.Msg.Areas {
		highlightArea := models.HighlightArea{
			Username:  request.Msg.Username,
			CommentId: request.Msg.Id,
			Height:    area.Height,
			Width:     area.Width,
			PageIndex: area.PageIndex,
			Top:       area.Top,
			Left:      area.Left,
		}
		s.db.DB.Create(&highlightArea)
	}
	comment := models.Comment{
		Username:  request.Msg.Username,
		Id:        request.Msg.Id,
		CommentId: request.Msg.Id,
		Content:   request.Msg.Content,
		Quote:     request.Msg.Quote,
	}

	resp := s.db.DB.Create(&comment)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return connect.NewResponse(&xctf.Empty{}), nil
}

func (s *Admin) GetComments(ctx context.Context, request *connect.Request[xctf.GetCommentsRequest]) (*connect.Response[xctf.GetCommentsResponse], error) {
	var comments []models.Comment
	resp := s.db.DB.Where(&models.Comment{Username: request.Msg.Username}).Find(&comments)
	if resp.Error != nil {
		return nil, resp.Error
	}

	var responseComments []*xctf.Comment
	for _, comment := range comments {
		var areas []*xctf.HighlightArea
		resp := s.db.DB.Where(&models.HighlightArea{Username: request.Msg.Username, CommentId: comment.CommentId}).Find(&areas)
		if resp.Error != nil {
			return nil, resp.Error
		}
		responseComments = append(responseComments, &xctf.Comment{
			Id:      comment.CommentId,
			Content: comment.Content,
			Areas:   areas,
			Quote:   comment.Quote,
		})
	}

	return connect.NewResponse(&xctf.GetCommentsResponse{
		Comments: responseComments,
	}), nil
}

func (s *Admin) GetUserGraph(ctx context.Context, request *connect.Request[xctf.GetUserGraphRequest]) (*connect.Response[xctf.GetUserGraphResponse], error) {
	var user models.User
	resp := s.db.DB.Where(&models.User{Username: request.Msg.Username}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	userID := user.ID

	var evidence []models.Evidence
	evResp := s.db.DB.Where(models.Evidence{UserID: int(userID)}).Find(&evidence)
	if evResp.Error != nil {
		return nil, evResp.Error
	}

	var connections []models.EvidenceConnection
	connResp := s.db.DB.Where(models.EvidenceConnection{UserID: int(userID)}).Find(&connections)
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

	return connect.NewResponse(&xctf.GetUserGraphResponse{
		Evidence:    discoveredEvidence,
		Connections: discoveredConnections,
	}), nil
}
