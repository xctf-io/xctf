package pkg

import (
	"context"
	"log"

	"github.com/twitchtv/twirp"
	"gorm.io/gorm"
)

// ResponseWriterKey From twirp: internal/contextkeys/keys.go
const (
	ResponseWriterKey = 6
)

func NewLoggingServerHooks() *twirp.ServerHooks {
	return &twirp.ServerHooks{
		RequestReceived: func(ctx context.Context) (context.Context, error) {
			return ctx, nil
		},
		RequestRouted: func(ctx context.Context) (context.Context, error) {
			method, _ := twirp.MethodName(ctx)
			log.Println("Method: " + method)
			return ctx, nil
		},
		Error: func(ctx context.Context, twerr twirp.Error) context.Context {
			log.Println("Error: " + string(twerr.Msg()))
			return ctx
		},
		ResponseSent: func(ctx context.Context) {
			log.Println("Response Sent (error or success)")
		},
	}
}

func NewAdminHooks(db *gorm.DB) *twirp.ServerHooks {
	return &twirp.ServerHooks{
		RequestReceived: func(ctx context.Context) (context.Context, error) {
			// TODO
			// userID, err := GetUserFromSession(ctx)
			// if err != nil {
			// 	return ctx, errors.New("session not found")
			// }

			// var user models.User
			// res := db.First(&user, userID)
			// if res.Error != nil {
			// 	return ctx, res.Error
			// }

			// if user.Type != "admin" {
			// 	return ctx, errors.New("unathorized")
			// }

			return ctx, nil
		},
	}
}
