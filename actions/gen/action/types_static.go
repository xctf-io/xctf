package action

import (
	"net/http"
	"github.com/go-masonry/mortar/providers/types"
)

type GraphQLError struct {
	Message string `json:"message"`
}

func annotateHandlerFunc(pattern string, handlerFunc http.HandlerFunc) types.HTTPHandlerFuncPatternPair {
	return types.HTTPHandlerFuncPatternPair{
		Pattern: pattern,
		Handler: handlerFunc,
	}
}