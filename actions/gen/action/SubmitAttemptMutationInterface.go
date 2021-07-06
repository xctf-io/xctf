package action

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type SubmitAttemptMutationActionPayload struct {
	SessionVariables map[string]interface{}    `json:"session_variables"`
	Input            SubmitAttemptMutationArgs `json:"input"`
}

type GraphQLError struct {
	Message string `json:"message"`
}

func makeHandler(logic SubmitAttemptMutationLogic) func(w http.ResponseWriter, r *http.Request) {
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
		var actionPayload SubmitAttemptMutationActionPayload
		err = json.Unmarshal(reqBody, &actionPayload)
		if err != nil {
			http.Error(w, "invalid payload", http.StatusBadRequest)
			return
		}

		// Send the request params to the Action's generated handler function
		result, err := SubmitAttemptMutation(actionPayload.Input)

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

// Auto-generated function that takes the Action parameters and must return it's response type

// HTTP server for the handler

type SubmitAttemptMutationLogic interface {
	// Auto-generated function that takes the Action parameters and must return it's response type
}
