package handler

import (
	gen "github.com/CTFg/CTFg/actions/gen/action"
	"net/http"
)

type submitAttemptMutation struct {
}

func (s *submitAttemptMutation) SubmitAttemptMutation(r *http.Request, args gen.SubmitAttemptMutationArgs) (response gen.SubmitAttemptMutationOutput, err error) {

	panic("implement me")
}

func NewSubmitAttemptMutation() gen.SubmitAttemptMutationLogic {
	return &submitAttemptMutation{}
}
