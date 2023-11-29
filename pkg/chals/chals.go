package chals

import (
	"embed"
	"github.com/xctf-io/xctf/gen/chalgen"
	"github.com/xctf-io/xctf/pkg/db"
	"github.com/xctf-io/xctf/pkg/models"
	"google.golang.org/protobuf/encoding/protojson"
	"html/template"
	"log/slog"
	"net/http"
	"strings"
)

//go:embed tmpl/*
var Chals embed.FS

type Handler struct {
	db *db.Service
}

func NewHandler(db *db.Service) *Handler {
	return &Handler{
		db: db,
	}
}

func (h *Handler) Handle() (string, http.Handler) {
	tmpl, err := template.ParseFS(Chals, "tmpl/twitter.tmpl.html")
	if err != nil {
		slog.Error("Error parsing template:", err)
		return "", nil
	}
	return "/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// match a url like /<competition id>/<challenge id>
		parts := strings.Split(r.URL.Path, "/")
		if len(parts) != 3 {
			http.NotFound(w, r)
			return
		}
		compId := parts[1]
		chalId := parts[2]

		var comp models.Competition
		res := h.db.DB.Where("id = ?", compId).First(&comp)
		if res.Error != nil {
			http.NotFound(w, r)
			return
		}

		var graph chalgen.Graph
		unm := protojson.UnmarshalOptions{DiscardUnknown: true}
		if err := unm.Unmarshal([]byte(comp.Graph), &graph); err != nil {
			slog.Error("unable to unmarshal graph", "error", err)
			http.NotFound(w, r)
			return
		}

		for _, n := range graph.Nodes {
			if n.Meta.Id == chalId {
				switch t := n.Challenge.(type) {
				case *chalgen.Node_Twitter:
					err := tmpl.Execute(w, t.Twitter)
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
					}
					return
				}
			}
		}
		slog.Warn("challenge not found", "compId", compId, "chalId", chalId)
		http.NotFound(w, r)
	})

}
