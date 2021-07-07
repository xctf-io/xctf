package action

import (
	"bytes"
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

type LogoutPayload struct {
	SessionVariables map[string]interface{} `json:"session_variables"`
	Input            LogoutArgs             `json:"input"`
}

func makeLogoutHandler(l LogoutLogic) http.HandlerFunc {
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
		var actionPayload LogoutPayload
		err = json.Unmarshal(reqBody, &actionPayload)
		if err != nil {
			http.Error(w, "invalid payload", http.StatusBadRequest)
			return
		}

		// Send the request params to the Action's generated handler function
		result, err := l.Logout(r, actionPayload.Input)

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

type LogoutLogic interface {
	Logout(r *http.Request, args LogoutArgs) (response LogoutResponse, err error)
}

type NewLogoutResult struct {
	fx.Out
	types.HTTPHandlerFuncPatternPair `group:"externalHttpHandlerFunctions"`
}

func NewLogout(l LogoutLogic) (NewLogoutResult, error) {
	if l == nil {
		return NewLogoutResult{}, errors.New("need LogoutLogic")
	}
	return NewLogoutResult{
		HTTPHandlerFuncPatternPair: types.HTTPHandlerFuncPatternPair{
			Pattern:     "/Logout",
			HandlerFunc: makeLogoutHandler(l),
		},
	}, nil
}
