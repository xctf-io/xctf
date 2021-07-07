package handler

import (
	"context"
	"github.com/CTFg/CTFg/actions/gen/action"
	"github.com/CTFg/CTFg/actions/gen/gql"
	"go.uber.org/fx"
)

type submitAttemptMutationDeps struct {
	fx.In

	GQLClient *gql.Client
}

type submitAttemptMutation struct {
	deps submitAttemptMutationDeps
}

func (s *submitAttemptMutation) SubmitAttemptMutation(ctx context.Context, args action.SubmitAttemptMutationArgs) (response action.SubmitAttemptMutationOutput, err error) {

	sres, err := s.deps.GQLClient.ExecuteSubmitAttemptMutation(ctx, nil)
	if err != nil {
		return response, err
	}

	// Do something with result of derived action
	_ = sres

	panic("implement me")
}

func NewSubmitAttemptMutation(deps submitAttemptMutationDeps) action.SubmitAttemptMutationLogic {
	return &submitAttemptMutation{deps: deps}
}
