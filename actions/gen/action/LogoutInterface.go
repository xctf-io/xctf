package action

import (
  "bytes"
  "encoding/json"
	"github.com/go-masonry/mortar/providers/groups"
	"github.com/go-masonry/mortar/providers/types"
	"go.uber.org/fx"
	"io/ioutil"
  "log"
  "net/http"
)

type LogoutActionPayload struct {
  SessionVariables map[string]interface{} `json:"session_variables"`
  Input            LogoutArgs `json:"input"`
}

type graphQLErrorLogout struct {
  Message string `json:"message"`
}



func makeLogoutHandler(logic LogoutLogic) func(w http.ResponseWriter, r *http.Request) { return func(w http.ResponseWriter, r *http.Request) {

  // set the response header as JSON
  w.Header().Set("Content-Type", "application/json")

  // read request body
  reqBody, err := ioutil.ReadAll(r.Body)
  if err != nil {
    http.Error(w, "invalid payload", http.StatusBadRequest)
    return
  }

  // parse the body as action payload
  var actionPayload LogoutActionPayload
  err = json.Unmarshal(reqBody, &actionPayload)
  if err != nil {
    http.Error(w, "invalid payload", http.StatusBadRequest)
    return
  }

  // Send the request params to the Action's generated handler function
  result, err := logic.Logout(actionPayload.Input)

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
  w.Write(data)}

}

// Auto-generated function that takes the Action parameters and must return it's response type
func Logout(args LogoutArgs) (response LogoutResponse, err error) {
  response =  LogoutResponse {
    Success: "<sample value>",
  }
  return response, nil
}


// HTTP server for the handler

type LogoutLogic interface{
  Logout(args LogoutArgs) (response LogoutResponse, err error) 
}

var LogoutModule = fx.Options(
  fx.Provide(makeLogoutHandler
)


var customHandlerFunc http.HandlerFunc ...

func createLogoutHandlerFuncPair() types.HTTPHandlerFuncPatternPair {
 return types.HTTPHandlerFuncPatternPair{
     Pattern: "/todo pattern",
     Handler: Logout,
 }
}

var LogoutActionModule = fx.Provide(
    fx.Annotated{
        Group: groups.ExternalHTTPHandlerFunctions,
        Target: createLogoutHandlerFuncPair, // function pointer, will be called by Uber-FX
    }
)

