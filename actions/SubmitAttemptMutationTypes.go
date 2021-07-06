



type Mutation struct {
    UnlockMutation *UnlockMutationOutput
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
    Id int
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

type LogoutArgs struct {
    
}

type SignupArgs struct {
    Name string
    Password string
    Captcha *string
}

type SubmitAttemptMutationArgs struct {
    Challenge_id *int
    Provided *string
}

type UnlockMutationArgs struct {
    Target *int
    Type *string
}