package pkg

import (
	"context"
	"errors"

	"gitea.com/go-chi/session"
)

// GetSession gets the session set by go chi session middleware.
func GetSession(ctx context.Context) session.Store {
	sessCtx := ctx.Value("Session")
	sess, _ := sessCtx.(session.Store)
	return sess
}

// SetUserForSession will set the user id in the session store located in the context.
func SetUserForSession(ctx context.Context, userID uint, userType string) {
	store := GetSession(ctx)
	store.Set("userID", userID)
}

func RemoveUserFromSession(ctx context.Context) {
	store := GetSession(ctx)
	store.Delete("userID")
	store.Delete("userType")
}

// GetUserFromSession will get the user id from the session store located in the context.
func GetUserFromSession(ctx context.Context) (uint, string, error) {
	store := GetSession(ctx)
	userIDInterface := store.Get("userID")
	userTypeInterface := store.Get("userType")
	userID, ok := userIDInterface.(uint)
	userType, ok2 := userTypeInterface.(string)
	if !ok || !ok2 {
		return 0, "", errors.New("failed to get user from session, please logout and login again")
	}
	return userID, userType, nil
}
