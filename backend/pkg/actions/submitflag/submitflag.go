package submitflag

import (
	"database/sql"
	"encoding/json"
	"github.com/ctfg/ctfg/backend/gen/ctfg/public/model"
	. "github.com/ctfg/ctfg/backend/gen/ctfg/public/table"
	"github.com/ctfg/ctfg/backend/pkg/util"
	"github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
	"io"
	"net/http"
	"os"
)

type ActionPayload struct {
	SessionVariables map[string]interface{} `json:"session_variables"`
	Input            submitFlagArgs         `json:"input"`
}

type GraphQLError struct {
	Message string `json:"message"`
}

// TODO (chthompson) oh god why
var (
	db *sql.DB
)

func init() {
	// TODO (cthompson) please use dependency injection https://github.com/google/wire
	databaseUrl := os.Getenv("DSN")

	var err error

	db, err = sql.Open("postgres", databaseUrl)
	if err != nil {
		panic(err)
	}
}

func Handler(w http.ResponseWriter, r *http.Request) {
	// set the response header as JSON
	w.Header().Set("Content-Type", "application/json")

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "invalid payload", http.StatusBadRequest)
		return
	}

	var actionPayload ActionPayload
	err = json.Unmarshal(reqBody, &actionPayload)
	if err != nil {
		http.Error(w, "invalid payload", http.StatusBadRequest)
		return
	}

	userId, ok := actionPayload.SessionVariables["x-hasura-user-id"]
	if !ok {
		http.Error(w, "user id is not defined", http.StatusUnauthorized)
		return
	}

	userUUID, err := uuid.Parse(userId.(string))
	if err != nil {
		http.Error(w, "user id is not defined", http.StatusUnauthorized)
		return
	}

	result, err := submitFlag(userUUID, actionPayload.Input)
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

func submitFlag(userId uuid.UUID, args submitFlagArgs) (response Output, err error) {
	flag := args.Req.Flag

	logger := log.With().Str("userId", userId.String()).Str("flag", flag).Logger()

	response = Output{
		Solved: false,
	}

	tx, err := db.Begin()
	if err != nil {
		return
	}

	checkFlagStmt := Flag.SELECT(
		Flag.ID,
		Flag.ChallengeID,
	).WHERE(
		Flag.Content.EQ(postgres.String(flag)),
	)

	var flagResult model.Flag

	err = checkFlagStmt.Query(tx, &flagResult)
	if err != nil {
		logger.Error().
			Err(err).
			Msg("unable to query for flag")

		// TODO (cthompson) differentiate bad error from ok error (flag doesn't exist)
		// not a fatal error, just means we couldn't find the flag
		err = nil
		return
	}
	response.Solved = true
	submission := model.Submission{
		Provided: util.Ptr(flag),
		UserID:   util.Ptr(userId),
	}

	submissionStmt := Submission.INSERT(
		Submission.Provided,
		Submission.UserID,
	).
		MODEL(submission).
		RETURNING(Submission.ID)

	var createdSubmission model.Submission

	err = submissionStmt.Query(tx, &createdSubmission)
	if err != nil {
		logger.Error().
			Err(err).
			Msg("failed to insert flag submission")
		return
	}

	log.Debug().
		Str("challenge id", flagResult.ChallengeID.String()).
		Str("submission id", createdSubmission.ID.String()).
		Msg("created submission")

	if response.Solved {
		// TODO (cthompson) check if already solved
		solve := model.Solve{
			ID:          createdSubmission.ID,
			ChallengeID: flagResult.ChallengeID,
			UserID:      util.Ptr(userId),
		}

		solveStmt := Solve.INSERT(
			Solve.ID,
			Solve.ChallengeID,
			Solve.UserID,
		).MODEL(solve)

		_, err = solveStmt.Exec(tx)
		if err != nil {
			logger.Error().
				Err(err).
				Msg("failed to insert flag solve")
			return
		}
	}
	return response, nil
}
