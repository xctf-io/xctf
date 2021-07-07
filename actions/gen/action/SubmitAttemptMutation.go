package gen

import (
	"encoding/json"
	"errors"
	"github.com/go-masonry/mortar/providers/types"
	"go.uber.org/fx"
	"io/ioutil"
	"net/http"
)

type SubmitAttemptMutationPayload struct {
	SessionVariables map[string]interface{}    `json:"session_variables"`
	Input            SubmitAttemptMutationArgs `json:"input"`
}

func makeSubmitAttemptMutationHandler(l SubmitAttemptMutationLogic) func(w http.ResponseWriter, r *http.Request) {
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
		result, err := l.SubmitAttemptMutation(r, actionPayload.Input)

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
	SubmitAttemptMutation(r *http.Request, args SubmitAttemptMutationArgs) (response SubmitAttemptMutationOutput, err error)
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
			Pattern:     "/your/pattern",
			HandlerFunc: makeSubmitAttemptMutationHandler(l),
		},
	}, nil
}
