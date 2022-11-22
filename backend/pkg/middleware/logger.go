package middleware

import (
	"context"
	"github.com/rs/zerolog"
	"net/http"
	"net/http/httptest"
	"net/http/httputil"
	"time"
)

func Logger(l zerolog.Logger) MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		// Logs all responses.
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			rec := httptest.NewRecorder()
			ctx := r.Context()
			path := r.URL.EscapedPath()
			reqData, _ := httputil.DumpRequest(r, false)
			logger := l.With().Timestamp().Str("path", path).Bytes("request_data", reqData)
			defer func(begin time.Time) {
				tookMs := time.Since(begin).Milliseconds()
				logger.Int64("took", tookMs).Str("method", r.Method).Str("path", path).Int64("time", tookMs)
			}(time.Now())

			// Replace "logger" with a custom type, like ContextKey("logger")
			ctx = context.WithValue(ctx, "logger", logger)
			next.ServeHTTP(rec, r.WithContext(ctx))
		})
	}
}
