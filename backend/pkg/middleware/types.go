package middleware

import "net/http"

type MiddlewareFunc = func(next http.Handler) http.Handler
