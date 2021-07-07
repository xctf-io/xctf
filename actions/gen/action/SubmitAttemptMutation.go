package action

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"github.com/go-masonry/mortar/providers/types"
	"go.uber.org/fx"
	"io/ioutil"
	"log"
	"net/http"
)

var _ = bytes.MinRead
var _ = log.Ldate

type SubmitAttemptMutationPayload struct {
	SessionVariables map[string]interface{}    `json:"session_variables"`
	Input            SubmitAttemptMutationArgs `json:"input"`
}

type SubmitAttemptMutationGraphQLRequest struct {
	Query     string                    `json:"query"`
	Variables SubmitAttemptMutationArgs `json:"variables"`
}
type SubmitAttemptMutationGraphQLData struct {
	SubmitAttemptMutationOutput `json:""`
}
type SubmitAttemptMutationGraphQLResponse struct {
	Data   SubmitAttemptMutationGraphQLData `json:"data,omitempty"`
	Errors []GraphQLError                   `json:"errors,omitempty"`
}

func makeSubmitAttemptMutationHandler(l SubmitAttemptMutationLogic) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// set the response header as JSON
		w.Header().Set("Content-Type", "application/json")

		// read request body
		reqBody, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "invalid payload", http.StatusBadRequest)
			return
		}

		// parse the body as action payload
		var actionPayload SubmitAttemptMutationPayload
		err = json.Unmarshal(reqBody, &actionPayload)
		if err != nil {
			http.Error(w, "invalid payload", http.StatusBadRequest)
			return
		}

		// Send the request params to the Action's generated handler function
		result, err := l.SubmitAttemptMutation(r.Context(), actionPayload.Input)

		// throw if an error happens
		if err != nil {
			errorObject := GraphQLError{
				Message: err.Error(),
			}
			errorBody, _ := json.Marshal(errorObject)
			w.WriteHeader(http.StatusBadRequest)
			w.Write(errorBody)
			return
		}

		// Write the response as JSON
		data, _ := json.Marshal(result)
		w.Write(data)
	}
}

type SubmitAttemptMutationLogic interface {
	SubmitAttemptMutation(ctx context.Context, args SubmitAttemptMutationArgs) (response SubmitAttemptMutationOutput, err error)
}

func ExecuteSubmitAttemptMutation(variables SubmitAttemptMutationArgs) (response SubmitAttemptMutationGraphQLResponse, err error) {

	// build the request body
	reqBody := SubmitAttemptMutationGraphQLRequest{
		Query:     "insert_submissions_one",
		Variables: variables,
	}
	reqBytes, err := json.Marshal(reqBody)
	if err != nil {
		return
	}

	// make request to Hasura
	resp, err := http.Post("http://localhost:8080/v1/graphql", "application/json", bytes.NewBuffer(reqBytes))
	if err != nil {
		return
	}

	// parse the response
	respBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}
	err = json.Unmarshal(respBytes, &response)
	if err != nil {
		return
	}

	// return the response
	return
}

type NewSubmitAttemptMutationResult struct {
	fx.Out
	types.HTTPHandlerFuncPatternPair `group:"externalHttpHandlerFunctions"`
}

func NewSubmitAttemptMutation(l SubmitAttemptMutationLogic) (NewSubmitAttemptMutationResult, error) {
	if l == nil {
		return NewSubmitAttemptMutationResult{}, errors.New("need SubmitAttemptMutationLogic")
	}
	return NewSubmitAttemptMutationResult{
		HTTPHandlerFuncPatternPair: types.HTTPHandlerFuncPatternPair{
			Pattern:     "/SubmitAttemptMutation",
			HandlerFunc: makeSubmitAttemptMutationHandler(l),
		},
	}, nil
}
