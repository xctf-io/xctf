package submitflag

type Input struct {
	Flag string `json:"flag"`
}

type Output struct {
	Solved bool `json:"solved"`
}

type Mutation struct {
	SubmitFlag *Output
}

type submitFlagArgs struct {
	Req Input
}
