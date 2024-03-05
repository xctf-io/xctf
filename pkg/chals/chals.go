package chals

import (
	"bytes"
	"embed"
	"encoding/base64"
	"encoding/gob"
	"fmt"
	"github.com/a-h/templ"
	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
	"github.com/google/gopacket/pcapgo"
	"github.com/google/wire"
	"github.com/samber/lo"
	"github.com/xctf-io/xctf/pkg/bucket"
	"github.com/xctf-io/xctf/pkg/chals/tmpl"
	"github.com/xctf-io/xctf/pkg/db"
	"github.com/xctf-io/xctf/pkg/gen/chalgen"
	"github.com/xctf-io/xctf/pkg/gen/plugin"
	shttp "github.com/xctf-io/xctf/pkg/http"
	"github.com/xctf-io/xctf/pkg/models"
	"google.golang.org/protobuf/encoding/protojson"
	"html/template"
	"io"
	"log/slog"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	ttemplate "text/template"
	"time"
)

//go:embed tmpl/*
var Chals embed.FS

var ProviderSet = wire.NewSet(
	NewConfig,
	NewPythonPlugin,
	NewHandler,
)

type Handler struct {
	c       Config
	db      *db.Service
	b       *bucket.Builder
	manager *shttp.Store
	pc      plugin.PythonServiceClient
}

func init() {
	gob.Register(tmpl.SessionState{})
	gob.Register(tmpl.PhoneState{})
}

func ChalURL(compId, chalID, host string) string {
	path := fmt.Sprintf("/play/%s/%s", compId, chalID)
	if host == "" {
		return path
	}
	u := url.URL{
		// TODO breadchris check if the original request was https
		Scheme: "http",
		Host:   host,
		Path:   path,
	}
	return u.String()
}

func NewHandler(
	c Config,
	db *db.Service,
	b *bucket.Builder,
	pc plugin.PythonServiceClient,
	manager *shttp.Store,
) *Handler {
	return &Handler{
		c:       c,
		db:      db,
		b:       b,
		pc:      pc,
		manager: manager,
	}
}

func (s *Handler) Handle() (string, http.Handler) {
	twitterTmpl, err := template.ParseFS(Chals, "tmpl/twitter.tmpl.html")
	if err != nil {
		slog.Error("Error parsing template:", err)
		return "", nil
	}
	return "/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// match a url like /<competition id>/<challenge id>
		parts := strings.Split(r.URL.Path, "/")
		if len(parts) < 3 {
			http.NotFound(w, r)
			return
		}

		compId := parts[1]
		chalId := parts[2]

		baseURL := fmt.Sprintf("/play/%s/%s", compId, chalId)

		var p string
		if len(parts) > 3 {
			p = strings.Join(parts[3:], "/")
		}

		var comp models.Competition
		res := s.db.DB.Where("id = ?", compId).First(&comp)
		if res.Error != nil {
			http.NotFound(w, r)
			return
		}

		_, userType, err := s.manager.GetUserFromSession(r.Context())
		if err != nil {
			slog.Debug("user not logged in", "err", err)
			http.Error(w, "user not logged in", http.StatusUnauthorized)
			return
		}

		if !comp.Active && userType != "admin" {
			http.Error(w, "competition is not active", http.StatusNotFound)
			return
		}

		var graph chalgen.Graph
		unm := protojson.UnmarshalOptions{DiscardUnknown: true}
		if err := unm.Unmarshal([]byte(comp.Graph), &graph); err != nil {
			slog.Error("unable to unmarshal graph", "error", err)
			http.NotFound(w, r)
			return
		}

		// TODO breadchris find dependencies of referenced challenge and build those
		challenges := map[string]string{}
		for _, n := range graph.Nodes {
			view := ""
			switch u := n.Challenge.(type) {
			case *chalgen.Node_Base:
				switch t := u.Base.Type.(type) {
				case *chalgen.Challenge_Base64:
					c := t.Base64.Data
					if n.Meta.Flag != "" {
						c += " " + n.Meta.Flag
					}
					view = base64.StdEncoding.EncodeToString([]byte(c))
				case *chalgen.Challenge_Caesar:
					c := t.Caesar.Plaintext
					if n.Meta.Flag != "" {
						c += " " + n.Meta.Flag
					}
					view = caesarCipher(c, int(t.Caesar.Shift))
				case *chalgen.Challenge_Pcap:
					view = ChalURL(compId, n.Meta.Id, r.Host)
				case *chalgen.Challenge_Slack:
					view = ChalURL(compId, n.Meta.Id, r.Host)
				}
			}
			if view != "" {
				challenges[n.Meta.Name] = view
			}
		}

		for _, n := range graph.Nodes {
			if n.Meta.Id == chalId {
				switch u := n.Challenge.(type) {
				case *chalgen.Node_Base:
					switch t := u.Base.Type.(type) {
					case *chalgen.Challenge_Filemanager:
						var sess tmpl.SessionState
						chatState := s.manager.GetChalState(r.Context(), chalId)
						if chatState != nil {
							ss, ok := chatState.(tmpl.SessionState)
							if !ok {
								http.Error(w, "Failed to parse session", http.StatusInternalServerError)
								return
							}
							sess = ss
						}
						if err := r.ParseForm(); err != nil {
							http.Error(w, "Failed to parse the form", http.StatusBadRequest)
							return
						}
						if p == "logout" {
							s.manager.RemoveChalState(r.Context(), chalId)
							w.Header().Set("Location", baseURL)
							w.WriteHeader(http.StatusFound)
							return
						}
						if p == "login" {
							password := r.FormValue("password")
							if t.Filemanager.Password == password {
								sess.User = &chalgen.User{
									Username: "user",
								}
								s.manager.SetChalState(r.Context(), chalId, sess)
							}
							w.Header().Set("Location", baseURL)
							w.WriteHeader(http.StatusFound)
							return
						}

						templ.Handler(tmpl.Page(tmpl.FileManager(tmpl.FileManagerState{
							Session: sess,
							URL: tmpl.FileManagerURL{
								Login: templ.URL(baseURL + "/login"),
							},
						}, t.Filemanager))).ServeHTTP(w, r)
						return

					case *chalgen.Challenge_Exif:
						// Returns an image file with the exif data embedded
						w.Header().Set("Content-Type", "image/jpeg")
						w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s.jpg", s))
						if err != nil {
							http.Error(w, err.Error(), http.StatusInternalServerError)
							return
						}
					case *chalgen.Challenge_Pcap:
						w.Header().Set("Content-Type", "application/vnd.tcpdump.pcap")
						w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s.pcap", s))
						err = s.NewPCAP(w, t.Pcap)
						if err != nil {
							http.Error(w, err.Error(), http.StatusInternalServerError)
						}
					case *chalgen.Challenge_Phone:
						var sess tmpl.PhoneState
						chatState := s.manager.GetChalState(r.Context(), chalId)
						if chatState != nil {
							ss, ok := chatState.(tmpl.PhoneState)
							if !ok {
								http.Error(w, "Failed to parse session", http.StatusInternalServerError)
								return
							}
							sess = ss
						}
						if p == "tracker/login" {
							password := r.FormValue("password")
							for _, app := range t.Phone.Apps {
								switch t := app.Type.(type) {
								case *chalgen.App_Tracker:
									if t.Tracker.Password == password {
										sess.TrackerAuthed = true
										s.manager.SetChalState(r.Context(), chalId, sess)
									}
								}
							}
							w.Header().Set("Location", baseURL)
							w.WriteHeader(http.StatusFound)
							return
						}
						for _, app := range t.Phone.Apps {
							nt, err := ttemplate.New("app").Parse(app.Url)
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
							var buf bytes.Buffer
							err = nt.Execute(&buf, struct {
								Challenges map[string]string
							}{
								Challenges: challenges,
							})
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
							app.Url = buf.String()
						}
						templ.Handler(tmpl.Page(tmpl.Phone(tmpl.PhoneState{
							TrackerLogin:  templ.URL(baseURL + "/tracker/login"),
							TrackerAuthed: sess.TrackerAuthed,
						}, t.Phone))).ServeHTTP(w, r)
						return
					case *chalgen.Challenge_Slack:
						var sess tmpl.SessionState
						chatState := s.manager.GetChalState(r.Context(), chalId)
						if chatState != nil {
							ss, ok := chatState.(tmpl.SessionState)
							if !ok {
								http.Error(w, "Failed to parse session", http.StatusInternalServerError)
								return
							}
							sess = ss
						}
						if err := r.ParseForm(); err != nil {
							http.Error(w, "Failed to parse the form", http.StatusBadRequest)
							return
						}
						if p == "logout" {
							s.manager.RemoveChalState(r.Context(), chalId)
							w.Header().Set("Location", baseURL)
							w.WriteHeader(http.StatusFound)
							return
						}
						if p == "login" {
							username := r.FormValue("username")
							password := r.FormValue("password")
							for _, u := range t.Slack.Users {
								if u.Username == username && u.Password == password {
									sess.User = u
									s.manager.SetChalState(r.Context(), chalId, sess)
								}
							}
							w.Header().Set("Location", baseURL)
							w.WriteHeader(http.StatusFound)
							return
						}
						cID := 0
						if cv := r.FormValue("channel_id"); cv != "" {
							cID, err = strconv.Atoi(cv)
							if err != nil {
								http.Error(w, "failed to parse channel id", http.StatusBadRequest)
								return
							}
						}

						if sess.User != nil {
							t.Slack.Channels = lo.Filter(
								t.Slack.Channels,
								func(c *chalgen.Channel, idx int) bool {
									return lo.Some(c.Usernames, []string{sess.User.Username})
								})
						} else {
							t.Slack.Channels = []*chalgen.Channel{}
						}

						var c chalgen.Channel
						if len(t.Slack.Channels)-1 >= cID {
							c = *t.Slack.Channels[cID]
						}

						templ.Handler(tmpl.Page(tmpl.Chat(tmpl.ChatState{
							Session: sess,
							URL: tmpl.ChatURL{
								Login:  templ.URL(baseURL + "/login"),
								Logout: templ.URL(baseURL + "/logout"),
							},
							Channel: c,
						}, t.Slack)), templ.WithErrorHandler(func(r *http.Request, err error) http.Handler {
							slog.Error("failed to template slack", "err", err)
							return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
								w.WriteHeader(http.StatusBadRequest)
								if _, err := io.WriteString(w, err.Error()); err != nil {
									slog.Error("failed to write response", "err", err)
								}
							})
						})).ServeHTTP(w, r)
						return
					case *chalgen.Challenge_Twitter:
						for _, p := range t.Twitter.Posts {
							nt, err := ttemplate.New("twitter").Parse(p.Content)
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
							var buf bytes.Buffer
							err = nt.Execute(&buf, struct {
								Challenges map[string]string
							}{
								Challenges: challenges,
							})
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
							p.Content = buf.String()
						}
						err := twitterTmpl.Execute(w, struct {
							Twitter *chalgen.Twitter
							Flag    string
						}{
							Twitter: t.Twitter,
							Flag:    n.Meta.Flag,
						})
						if err != nil {
							http.Error(w, err.Error(), http.StatusInternalServerError)
						}
						return
					}
				case *chalgen.Node_Python:
					rsp, err := s.pc.Generate(r.Context(), &plugin.GenerateRequest{
						Challenge: u.Python,
					})
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
						return
					}
					if rsp.Display != "" {
						w.Header().Set("Content-Type", "text/plain")
						w.Write([]byte(rsp.Display))
						return
					}
					if rsp.File != "" {
						// open file and serve
						http.ServeFile(w, r, rsp.File)
						return
					}
				}
			}
		}
		slog.Warn("challenge not found", "compId", compId, "chalId", chalId)
		http.NotFound(w, r)
	})
}

func (s *Handler) NewPCAP(wr io.Writer, p *chalgen.PCAP) error {
	w := pcapgo.NewWriter(wr)
	err := w.WriteFileHeader(65536, layers.LinkTypeEthernet) // Adjust the snaplen and link type as needed
	if err != nil {
		return err
	}

	for _, p := range p.Packets {
		// Create a simple Ethernet/IP/TCP packet with payload
		// You would typically want to construct the packet based on the actual data and protocol
		// This is a simplification for demonstration purposes
		eth := layers.Ethernet{
			SrcMAC:       net.HardwareAddr{0x00, 0x00, 0x00, 0x00, 0x00, 0x00},
			DstMAC:       net.HardwareAddr{0x00, 0x00, 0x00, 0x00, 0x00, 0x01},
			EthernetType: layers.EthernetTypeIPv4,
		}
		ip := layers.IPv4{
			SrcIP:    net.ParseIP(p.Source),
			DstIP:    net.ParseIP(p.Destination),
			Protocol: layers.IPProtocolTCP,
		}
		tcp := layers.TCP{
			SrcPort: layers.TCPPort(80),
			DstPort: layers.TCPPort(80),
		}
		tcp.SetNetworkLayerForChecksum(&ip)

		// Stack the layers
		buf := gopacket.NewSerializeBuffer()
		opts := gopacket.SerializeOptions{
			ComputeChecksums: true,
			FixLengths:       true,
		}

		gopacket.SerializeLayers(buf, opts, &eth, &ip, &tcp, gopacket.Payload(p.Data))

		// Create a custom packet
		ci := gopacket.CaptureInfo{
			Timestamp:     time.Unix(0, p.Timestamp),
			CaptureLength: len(buf.Bytes()),
			Length:        len(buf.Bytes()),
		}

		err := w.WritePacket(ci, buf.Bytes())
		if err != nil {
			return err
		}
	}
	return nil
}

func evaluateTemplate(tmpl string, data interface{}) (string, error) {
	t, err := template.New("template").Parse(tmpl)
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer
	err = t.Execute(&buf, data)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}
