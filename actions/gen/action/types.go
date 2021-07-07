package action

type Mutation struct {
	Unlock *UnlockMutationOutput
}

type SubmitFlagMutationOutput struct {
	Id int
}

type PurchaseUnlockableOutput struct {
	Id int
}

type PurchaseUnlockableMutationOutput struct {
	Id int
}

type UnlockMutationOutput struct {
	Id int
}

type JsonWebToken struct {
	Token string
}

type CreateUserOutput struct {
	Id    int
	Token string
}

type LogoutResponse struct {
	Success *bool
}

type SubmitMutationOutput struct {
	Id int
}

type SubmitAttemptMutationOutput struct {
	Id int
}

type RegisterOutput struct {
	Id    int
	Token string
}

type SubmitArgs struct {
	Challenge_id int
	Provided     string
}

type UnlockArgs struct {
	Target *int
	Type   *string
}

type GraphQLError struct {
	Message string `json:"message"`
}
