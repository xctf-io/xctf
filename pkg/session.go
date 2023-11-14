package pkg

import (
	"context"
	"errors"
	"github.com/breadchris/scs/v2"
)

var (
	// TODO breadchris dep inject
	store *scs.SessionManager
)

// SetUserForSession will set the user id in the session store located in the context.
func SetUserForSession(ctx context.Context, userID uint, userType string) {
	store.Put(ctx, "userID", userID)
	store.Put(ctx, "userType", userType)
}

func RemoveUserFromSession(ctx context.Context) {
	store.Remove(ctx, "userID")
	store.Remove(ctx, "userType")
}

// GetUserFromSession will get the user id from the session store located in the context.
func GetUserFromSession(ctx context.Context) (uint, string, error) {
	userIDInterface := store.Get(ctx, "userID")
	userTypeInterface := store.Get(ctx, "userType")
	userID, ok := userIDInterface.(uint)
	userType, ok2 := userTypeInterface.(string)
	if !ok || !ok2 {
		return 0, "", errors.New("failed to get user from session, please logout and login again")
	}
	return userID, userType, nil
}
