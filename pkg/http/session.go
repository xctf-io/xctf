package http

import (
	"context"
	"errors"
	"github.com/alexedwards/scs/gormstore"
	"github.com/breadchris/scs/v2"
	"github.com/google/wire"
	"github.com/xctf-io/xctf/pkg/db"
	"net/http"
	"time"
)

type Store struct {
	manager *scs.SessionManager
}

var ProviderSet = wire.NewSet(New)

func New(s *db.Service) (*Store, error) {
	manager := scs.New()

	manager.Lifetime = time.Hour * 24 * 7 * 4

	var err error
	if manager.Store, err = gormstore.New(s.DB); err != nil {
		return nil, err
	}
	return &Store{
		manager: manager,
	}, nil
}

func (s *Store) LoadAndSave(next http.Handler) http.Handler {
	return s.manager.LoadAndSave(next)
}

// SetUserForSession will set the user id in the session store located in the context.
func (s *Store) SetUserForSession(ctx context.Context, userID uint, userType string) {
	s.manager.Put(ctx, "userID", userID)
	s.manager.Put(ctx, "userType", userType)
}

func (s *Store) RemoveUserFromSession(ctx context.Context) {
	s.manager.Remove(ctx, "userID")
	s.manager.Remove(ctx, "userType")
}

func (s *Store) SetChalState(ctx context.Context, chalID string, state any) {
	s.manager.Put(ctx, chalID, state)
}

func (s *Store) RemoveChalState(ctx context.Context, chalID string) {
	s.manager.Remove(ctx, chalID)
}

func (s *Store) GetChalState(ctx context.Context, chalID string) any {
	return s.manager.Get(ctx, chalID)
}

// GetUserFromSession will get the user id from the session store located in the context.
func (s *Store) GetUserFromSession(ctx context.Context) (uint, string, error) {
	userIDInterface := s.manager.Get(ctx, "userID")
	userTypeInterface := s.manager.Get(ctx, "userType")
	userID, ok := userIDInterface.(uint)
	userType, ok2 := userTypeInterface.(string)
	if !ok || !ok2 {
		return 0, "", errors.New("failed to get user from session, please logout and login again")
	}
	return userID, userType, nil
}
