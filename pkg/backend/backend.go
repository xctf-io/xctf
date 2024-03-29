package backend

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/google/uuid"
	"github.com/gosimple/slug"
	"github.com/pkg/errors"
	"github.com/protoflow-labs/protoflow/pkg/grpc"
	"github.com/rs/zerolog/log"
	"github.com/xctf-io/xctf/pkg/bucket"
	"github.com/xctf-io/xctf/pkg/chals"
	"github.com/xctf-io/xctf/pkg/db"
	"github.com/xctf-io/xctf/pkg/gen/chalgen"
	pchals "github.com/xctf-io/xctf/pkg/gen/chals"
	"github.com/xctf-io/xctf/pkg/gen/xctf"
	"github.com/xctf-io/xctf/pkg/gen/xctf/xctfconnect"
	"github.com/xctf-io/xctf/pkg/http"
	"github.com/xctf-io/xctf/pkg/models"
	"github.com/xctf-io/xctf/pkg/openai"
	"google.golang.org/protobuf/encoding/protojson"
	"gorm.io/gorm"
	"math/rand"
	"time"
)

type Backend struct {
	s       *db.Service
	manager *http.Store
	h       *chals.Handler
	openai  *openai.Agent
	b       *bucket.Builder
	c       chals.Config
}

var _ xctfconnect.BackendHandler = (*Backend)(nil)

func NewBackend(
	s *db.Service,
	manager *http.Store,
	h *chals.Handler,
	openai *openai.Agent,
	b *bucket.Builder,
	c chals.Config,
) *Backend {
	return &Backend{
		s:       s,
		manager: manager,
		h:       h,
		openai:  openai,
		b:       b,
		c:       c,
	}
}

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func generateRandomString(length int, secret, identifier string) string {
	seedData := fmt.Sprintf("%s-%s", secret, identifier)

	hash := sha256.Sum256([]byte(seedData))
	seed := int64(0)
	for _, b := range hash[:8] {
		seed = (seed << 8) | int64(b)
	}

	r := rand.New(rand.NewSource(seed))

	b := make([]byte, length)
	for i := range b {
		b[i] = charset[r.Intn(len(charset))]
	}
	return string(b)
}

func (b *Backend) SignedURL(ctx context.Context, c *connect.Request[xctf.SignedURLRequest]) (*connect.Response[xctf.SignedURLResponse], error) {
	url, err := b.b.SignedURL(ctx, c.Msg.Path, time.Minute*5)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(&xctf.SignedURLResponse{
		Url: url,
	}), nil
}

func (b *Backend) DeleteCompetition(ctx context.Context, c *connect.Request[chalgen.Competition]) (*connect.Response[xctf.Empty], error) {
	var comp models.Competition
	result := b.s.DB.Where("id = ?", c.Msg.Id).Delete(&comp)
	if result.Error != nil {
		return nil, result.Error
	}
	return connect.NewResponse(&xctf.Empty{}), nil
}

func (b *Backend) GetCompetitions(ctx context.Context, c *connect.Request[xctf.Empty]) (*connect.Response[chalgen.CompetitionList], error) {
	var comps []models.Competition
	result := b.s.DB.Find(&comps)
	if result.Error != nil {
		return nil, result.Error
	}

	var cl []*chalgen.Competition
	for _, comp := range comps {
		var graph chalgen.Graph
		unm := protojson.UnmarshalOptions{DiscardUnknown: true}
		if err := unm.Unmarshal([]byte(comp.Graph), &graph); err != nil {
			log.Error().Err(err).Msg("unable to unmarshal graph")
			continue
		}
		cl = append(cl, &chalgen.Competition{
			Id:     fmt.Sprintf("%d", comp.ID),
			Name:   comp.Name,
			Graph:  &graph,
			Active: comp.Active,
		})
	}

	return connect.NewResponse(&chalgen.CompetitionList{
		Competitions: cl,
	}), nil
}

func (b *Backend) UpdateCompetition(ctx context.Context, c *connect.Request[chalgen.Competition]) (*connect.Response[chalgen.Competition], error) {
	existingIds := map[string]*chalgen.Node{}
	for _, node := range c.Msg.Graph.Nodes {
		if node.Meta == nil {
			node.Meta = &pchals.Meta{}
		}
		if en, ok := existingIds[node.Meta.Id]; ok {
			return nil, errors.New(fmt.Sprintf("duplicate node id: %s and %s", node.Meta.Name, en.Meta.Name))
		}
		if node.Meta.Id == "" {
			node.Meta.Id = uuid.NewString()
		}
		existingIds[node.Meta.Id] = node

		c.Msg.Name = slug.Make(c.Msg.Name)
	}
	m := &protojson.MarshalOptions{}
	bm, err := m.Marshal(c.Msg.Graph)
	if err != nil {
		return nil, err
	}

	// TODO breadchris moving between the protobuf and db model feels awkward here

	var cm models.Competition
	result := b.s.DB.Where("id = ?", c.Msg.Id).First(&cm)
	if result.Error != nil {
		cm = models.Competition{
			Name:   c.Msg.Name,
			Graph:  string(bm),
			Active: c.Msg.Active,
		}
		result = b.s.DB.Create(&cm)
	} else {
		cm.Graph = string(bm)
		cm.Name = c.Msg.Name
		cm.Active = c.Msg.Active
		result = b.s.DB.Save(&cm)
	}
	if result.Error != nil {
		return nil, result.Error
	}
	// TODO breadchris hacked for the demo, think through this more
	for _, node := range c.Msg.Graph.Nodes {
		chal := &models.Challenge{
			Name:          node.Meta.Name,
			Flag:          node.Meta.Flag,
			CompetitionID: cm.ID,
		}
		err = b.s.DB.Where(models.Challenge{
			Name:          node.Meta.Name,
			CompetitionID: cm.ID,
		}).Assign(models.Challenge{
			Flag:          node.Meta.Flag,
			CompetitionID: cm.ID,
		}).FirstOrCreate(&chal).Error
		if err != nil {
			return nil, err
		}
	}

	return connect.NewResponse(&chalgen.Competition{
		Id:    fmt.Sprintf("%d", cm.ID),
		Name:  c.Msg.Name,
		Graph: c.Msg.Graph,
	}), nil
}

func (b *Backend) ChallengeType(ctx context.Context, c *connect.Request[xctf.Empty]) (*connect.Response[xctf.ChallengeTypeResponse], error) {
	e := &chalgen.Node{}
	ed, err := grpc.SerializeType(e)
	if err != nil {
		return nil, errors.Wrapf(err, "error serializing node type")
	}

	// TODO breadchris cleanup this code, see blocks.go:76
	tr := grpc.NewTypeResolver()
	tr = tr.ResolveLookup(e)

	sr := tr.Serialize()

	return connect.NewResponse(&xctf.ChallengeTypeResponse{
		TypeInfo: &xctf.GRPCTypeInfo{
			Msg:        ed.AsDescriptorProto(),
			DescLookup: sr.DescLookup,
			EnumLookup: sr.EnumLookup,
		},
	}), nil
}

func (b *Backend) SubmitEvidence(ctx context.Context, request *connect.Request[xctf.SubmitEvidenceRequest]) (*connect.Response[xctf.SubmitEvidenceResponse], error) {
	userID, _, err := b.manager.GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	name := request.Msg.Evidence
	if len(name) == 0 {
		return nil, errors.New("evidence name cannot be empty")
	}

	var chal models.Challenge
	res := b.s.DB.Where(models.Challenge{
		Flag: request.Msg.Evidence,
	}).First(&chal)
	if res.Error != nil && request.Msg.IsFlag {
		return nil, errors.New("invalid flag")
	}

	// A flag was found for the challenge, set the name to the challenge name
	if res.Error == nil {
		name = chal.Name
	}

	var evidence models.Evidence
	res = b.s.DB.Where(models.Evidence{Name: name, UserID: int(userID)}).First(&evidence)
	if res.Error == nil {
		if request.Msg.Remove {
			log.Debug().
				Str("name", name).
				Msg("deleting existing evidence")
			b.s.DB.Delete(&evidence)
		} else {
			log.Debug().
				Str("name", name).
				Msg("updating existing evidence")
			evidence.PositionX = int(request.Msg.X)
			evidence.PositionY = int(request.Msg.Y)
			b.s.DB.Save(&evidence)
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
		res = b.s.DB.Create(&evidence)
		if res.Error != nil {
			return nil, res.Error
		}
	}
	return connect.NewResponse(&xctf.SubmitEvidenceResponse{
		Name: name,
	}), nil
}

func (b *Backend) SubmitEvidenceReport(ctx context.Context, req *connect.Request[xctf.SubmitEvidenceReportRequest]) (*connect.Response[xctf.SubmitEvidenceReportRequest], error) {
	userID, _, err := b.manager.GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var report models.EvidenceReport
	res := b.s.DB.Where(&models.EvidenceReport{UserID: int(userID)}).First(&report)
	if res.Error != nil {
		newReport := &models.EvidenceReport{
			UserID: int(userID),
			URL:    req.Msg.Url,
		}
		if res = b.s.DB.Create(&newReport); res.Error != nil {
			return nil, res.Error
		}
		return connect.NewResponse(&xctf.SubmitEvidenceReportRequest{}), nil
	}

	report.URL = req.Msg.Url
	b.s.DB.Save(report)
	return connect.NewResponse(&xctf.SubmitEvidenceReportRequest{}), nil
}

func GenerateRandomString(length int, secret, identifier string) (string, error) {
	if length <= 0 {
		return "", fmt.Errorf("invalid length: %d", length)
	}

	bytes := make([]byte, (length+1)/2) // +1 to handle odd lengths
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}

	str := hex.EncodeToString(bytes)
	return str[:length], nil
}

func (b *Backend) Register(ctx context.Context, request *connect.Request[xctf.RegisterRequest]) (*connect.Response[xctf.RegisterResponse], error) {
	user := models.User{
		Model:            gorm.Model{},
		Username:         request.Msg.Username,
		Email:            request.Msg.Email,
		ComputerPassword: generateRandomString(16, b.c.Scheme, request.Msg.Username),
	}
	if len(request.Msg.Password) == 0 || len(request.Msg.Username) == 0 || len(request.Msg.Password) == 0 {
		return nil, errors.New("fields cannot be empty")
	}

	// var hasNumber, hasCapital, hasSpecial bool
	// for _, c := range request.Msg.Password {
	// 	if c >= '0' && c <= '9' {
	// 		hasNumber = true
	// 	}
	// 	if c >= 'A' && c <= 'Z' {
	// 		hasCapital = true
	// 	}
	// 	if c == '!' || c == '@' || c == '#' || c == '$' || c == '%' || c == '^' || c == '&' || c == '*' {
	// 		hasSpecial = true
	// 	}
	// }
	// if len(request.Msg.Password) < 8 || !hasNumber || !hasCapital || !hasSpecial {
	// 	return nil, errors.New("password must contain at least one number, one capital letter, and one special character")
	// }

	err := user.HashPassword(request.Msg.Password)
	if err != nil {
		return nil, err
	}

	result := b.s.DB.Create(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return connect.NewResponse(&xctf.RegisterResponse{
		Created: true,
	}), nil
}

func (b *Backend) Login(ctx context.Context, request *connect.Request[xctf.LoginRequest]) (*connect.Response[xctf.LoginResponse], error) {
	var user models.User
	resp := b.s.DB.Where(&models.User{Email: request.Msg.Email}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}

	err := user.CheckPassword(request.Msg.Password)
	if err != nil {
		return nil, errors.New("incorrect password for user")
	}

	b.manager.SetUserForSession(ctx, user.ID, user.Type)

	return connect.NewResponse(&xctf.LoginResponse{
		Username: user.Username,
		UserRole: user.Type,
	}), nil
}

func (b *Backend) Logout(ctx context.Context, request *connect.Request[xctf.Empty]) (*connect.Response[xctf.Empty], error) {
	b.manager.RemoveUserFromSession(ctx)
	return connect.NewResponse(&xctf.Empty{}), nil
}

func (b *Backend) CurrentUser(ctx context.Context, request *connect.Request[xctf.CurrentUserRequest]) (*connect.Response[xctf.CurrentUserResponse], error) {
	userID, userType, err := b.manager.GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var pages []models.Page
	resp := b.s.DB.Find(&pages)
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
	resp = b.s.DB.Where(&models.User{Model: gorm.Model{ID: userID}}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}

	return connect.NewResponse(&xctf.CurrentUserResponse{
		Username: user.Username,
		UserRole: userType,
		Pages:    returnedPages,
	}), nil
}

func (b *Backend) GetComputer(ctx context.Context, c *connect.Request[xctf.GetComputerRequest]) (*connect.Response[xctf.GetComputerResponse], error) {
	uid, _, err := b.manager.GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	u := models.User{}
	res := b.s.DB.Where(models.User{Model: gorm.Model{ID: uid}}).First(&u)
	if res.Error != nil {
		return nil, res.Error
	}
	if u.ComputerID == "" {
		return connect.NewResponse(&xctf.GetComputerResponse{
			Loading: true,
		}), nil
	}
	// TODO breadchris configure domain
	// TODO breadchris auto deploy computer
	return connect.NewResponse(&xctf.GetComputerResponse{
		Url:     fmt.Sprintf("https://shells.mcpshsf.com/%s/vnc_lite.html?path=/%s/websockify&password=%s", u.ComputerID, u.ComputerID, u.ComputerPassword),
		Loading: false,
	}), nil
}

func (b *Backend) SubmitFlag(ctx context.Context, request *connect.Request[xctf.SubmitFlagRequest]) (*connect.Response[xctf.SubmitFlagResponse], error) {
	return connect.NewResponse(&xctf.SubmitFlagResponse{
		Correct: false,
	}), nil
}

func (b *Backend) GetDiscoveredEvidence(ctx context.Context, request *connect.Request[xctf.GetDiscoveredEvidenceRequest]) (*connect.Response[xctf.GetDiscoveredEvidenceResponse], error) {
	userID, _, err := b.manager.GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	// var report models.EvidenceReport
	// b.s.DB.Where(&models.EvidenceReport{UserID: int(userID)}).First(&report)

	var evidence []models.Evidence
	evResp := b.s.DB.Where(models.Evidence{UserID: int(userID)}).Find(&evidence)
	if evResp.Error != nil {
		return nil, evResp.Error
	}

	var connections []models.EvidenceConnection
	connResp := b.s.DB.Where(models.EvidenceConnection{UserID: int(userID)}).Find(&connections)
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
	userID, _, err := b.manager.GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	// TODO verify source and destination are accessible to the user
	evidenceConn := models.EvidenceConnection{
		SourceID:      int(request.Msg.Source),
		DestinationID: int(request.Msg.Destination),
		UserID:        int(userID),
	}
	res := b.s.DB.Where(evidenceConn).First(&evidenceConn)
	if res.Error != nil {
		res = b.s.DB.Create(&evidenceConn)
		if res.Error != nil {
			return nil, res.Error
		}
	} else {
		if request.Msg.Remove {
			res = b.s.DB.Delete(&evidenceConn)
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
	id, graph, err := b.s.GetCurrentCompetition()
	if err != nil {
		return nil, err
	}

	if graph == nil {
		return connect.NewResponse(&xctf.GetHomePageResponse{
			Content:     "no competition graph",
			Entrypoints: []*xctf.Entrypoint{},
		}), nil
	}

	var entrypoints []*xctf.Entrypoint
	for _, node := range graph.Nodes {
		if node.Meta.Entrypoint {
			entrypoints = append(entrypoints, &xctf.Entrypoint{
				Name:  node.Meta.Name,
				Route: chals.ChalURL(b.c.Scheme, id, node.Meta.Id, ""),
			})
		}
	}
	var homePage models.HomePage
	resp := b.s.DB.First(&homePage)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return connect.NewResponse(&xctf.GetHomePageResponse{
		Content:     homePage.Content,
		Entrypoints: entrypoints,
	}), nil
}

func (b *Backend) ForgotPassword(ctx context.Context, request *connect.Request[xctf.ForgotPasswordRequest]) (*connect.Response[xctf.Empty], error) {
	// check if user exists
	var user models.User
	resp := b.s.DB.Where(models.User{Email: request.Msg.Email}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return nil, errors.New("not implemented")
}

func (b *Backend) GetUserWriteup(ctx context.Context, c *connect.Request[xctf.Empty]) (*connect.Response[xctf.GetUserWriteupResponse], error) {
	userId, _, err := b.manager.GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var writeup models.Writeup
	resp := b.s.DB.Where(models.Writeup{UserID: userId}).First(&writeup)
	if resp.Error != nil {
		return nil, resp.Error
	}
	return connect.NewResponse(&xctf.GetUserWriteupResponse{
		Content: writeup.Content,
	}), nil
}

func (b *Backend) SubmitWriteup(ctx context.Context, request *connect.Request[xctf.SubmitWriteupRequest]) (*connect.Response[xctf.Empty], error) {
	userId, _, err := b.manager.GetUserFromSession(ctx)
	if err != nil {
		return nil, err
	}

	var user models.User
	resp := b.s.DB.Where(models.User{Model: gorm.Model{ID: userId}}).First(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}
	user.HasWriteup = true
	resp = b.s.DB.Save(&user)
	if resp.Error != nil {
		return nil, resp.Error
	}

	var writeup models.Writeup
	resp = b.s.DB.Where(models.Writeup{UserID: userId}).First(&writeup)
	if resp.Error != nil {
		writeup := models.Writeup{
			UserID:  userId,
			Content: request.Msg.Content,
			Type:    request.Msg.Type,
		}
		resp = b.s.DB.Create(&writeup)
		if resp.Error != nil {
			return nil, resp.Error
		}
	} else {
		writeup.Content = request.Msg.Content
		writeup.Type = request.Msg.Type
		resp = b.s.DB.Save(&writeup)
		if resp.Error != nil {
			return nil, resp.Error
		}
	}
	return connect.NewResponse(&xctf.Empty{}), nil
}
