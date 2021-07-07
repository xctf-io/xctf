package handler

import (
	gen "github.com/CTFg/CTFg/actions/gen/action"
	"net/http"
)

type logout struct {
}

func (s *logout) Logout(r *http.Request, args gen.LogoutArgs) (response gen.LogoutResponse, err error) {

	panic("implement me")
}

func NewLogout() gen.LogoutLogic {
	return &logout{}
}
