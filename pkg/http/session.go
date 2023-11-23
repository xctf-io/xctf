package http

import (
	"context"
	"errors"
	"github.com/alexedwards/scs/gormstore"
	"github.com/breadchris/scs/v2"
	"github.com/google/wire"
	"gorm.io/gorm"
	"net/http"
)

type Store struct {
	manager *scs.SessionManager
}

var ProviderSet = wire.NewSet(New)

func New(db *gorm.DB) (*Store, error) {
	manager := scs.New()

	var err error
	if manager.Store, err = gormstore.New(db); err != nil {
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
