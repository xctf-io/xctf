package chals

import (
	"bytes"
	"embed"
	"encoding/base64"
	"encoding/gob"
	"encoding/json"
	"fmt"
	"github.com/a-h/templ"
	"github.com/go-pdf/fpdf"
	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
	"github.com/google/gopacket/pcapgo"
	"github.com/google/wire"
	"github.com/samber/lo"
	"github.com/skip2/go-qrcode"
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
	qrMemo  map[string][]byte
}

func init() {
	gob.Register(tmpl.SessionState{})
	gob.Register(tmpl.PhoneState{})
}

// TODO breadchris base url should be configured from the environment?
func ChalURL(scheme, compId, chalID, host string) string {
	path := fmt.Sprintf("/play/%s/%s", compId, chalID)
	if host == "" {
		return path
	}
	u := url.URL{
		// TODO breadchris check if the original request was https
		Scheme: scheme,
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
		qrMemo:  map[string][]byte{},
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
			chalURL := ChalURL(s.c.Scheme, compId, n.Meta.Id, r.Host)
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
				case *chalgen.Challenge_Xor:
					view = string(xorEncryptDecrypt([]byte(t.Xor.Plaintext), []byte(t.Xor.Key)))
				}
			}
			if view != "" {
				challenges[n.Meta.Name] = view
			} else {
				challenges[n.Meta.Name] = chalURL
			}
		}

		templChals := func(tl string) (string, error) {
			nt, err := ttemplate.New("templ").Parse(tl)
			if err != nil {
				return "", err
			}
			var buf bytes.Buffer
			err = nt.Execute(&buf, struct {
				Challenges map[string]string
			}{
				Challenges: challenges,
			})
			if err != nil {
				return "", err
			}
			return buf.String(), nil
		}

		for _, n := range graph.Nodes {
			if n.Meta.Id == chalId {
				switch u := n.Challenge.(type) {
				case *chalgen.Node_Base:
					switch t := u.Base.Type.(type) {
					case *chalgen.Challenge_Data:
						w.Header().Set("Content-Type", "text/plain; charset=UTF-8")
						w.Write([]byte(t.Data.Data))
						return
					case *chalgen.Challenge_Pdf:
						pdf := fpdf.New("P", "mm", "A4", "")
						pdf.AddPage()
						pdf.SetFont("Arial", "", 12)
						pdf.SetFont("Arial", "", 12)
						pdf.MultiCell(0, 10, t.Pdf.Content, "", "", false)
						pdf.Ln(5)
						w.Header().Set("content-type", "application/pdf")
						err = pdf.Output(w)
						if err != nil {
							slog.Error("failed to generated pdf", "err", err)
							http.Error(w, "failed to generate pdf", http.StatusBadRequest)
							return
						}
						return
					case *chalgen.Challenge_Maze:
						if err := r.ParseForm(); err != nil {
							http.Error(w, "Failed to parse the form", http.StatusBadRequest)
							return
						}
						var solvedPaths []string
						if p == "solve" {
							for _, path := range t.Maze.Paths {
								solved := true
								for _, coord := range path.Coords {
									b := fmt.Sprintf("%d:%d", coord.Row, coord.Col)
									if r.Form.Get(b) != "on" {
										solved = false
										break
									}
								}
								if solved {
									solvedPaths = append(solvedPaths, path.Result)
								}
							}
						}
						if p == "qr" {
							var (
								png []byte
								ok  bool
							)
							v := r.FormValue("value")
							if png, ok = s.qrMemo[v]; !ok {
								png, err = qrcode.Encode(v, qrcode.Medium, 256)
								if err != nil {
									http.Error(w, "failed to create qr code", http.StatusBadRequest)
									return
								}
							}
							w.Header().Set("Content-Type", "image/png")
							w.Write(png)
							return
						}
						templ.Handler(tmpl.Page(tmpl.Maze(tmpl.MazeState{
							QR: func(s string) string {
								return fmt.Sprintf("%s/qr?value=%s", baseURL, s)
							},
							Solve:       templ.URL(baseURL + "/solve"),
							SolvedPaths: solvedPaths,
						}, t.Maze))).ServeHTTP(w, r)
						return
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

						var newUrls []string
						for _, ul := range t.Filemanager.Urls {
							ul, err = templChals(ul)
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
							newUrls = append(newUrls, ul)
						}
						t.Filemanager.Urls = newUrls

						templ.Handler(tmpl.Page(tmpl.FileManager(tmpl.FileManagerState{
							Flag:    n.Meta.Flag,
							Session: sess,
							URL: tmpl.FileManagerURL{
								Login: templ.URL(baseURL + "/login"),
							},
						}, t.Filemanager)), templ.WithErrorHandler(func(r *http.Request, err error) http.Handler {
							slog.Error("failed to template phone", "err", err)
							return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
								w.WriteHeader(http.StatusBadRequest)
								if _, err := io.WriteString(w, err.Error()); err != nil {
									slog.Error("failed to write response", "err", err)
								}
							})
						})).ServeHTTP(w, r)
						return
					case *chalgen.Challenge_Exif:
						// TODO breadchris generate exif image
						w.Header().Set("Content-Type", "image/jpeg")
						w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s.jpg", "image"))
						if err != nil {
							http.Error(w, err.Error(), http.StatusInternalServerError)
							return
						}
						return
					case *chalgen.Challenge_Pcap:
						w.Header().Set("Content-Type", "application/vnd.tcpdump.pcap")
						w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s.pcap", "asdf"))
						err = s.NewPCAP(w, t.Pcap)
						if err != nil {
							http.Error(w, err.Error(), http.StatusInternalServerError)
						}
						return
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
							if sess.NextAttempt.After(time.Now()) {
								http.Error(w, "You must wait 1 minute before trying again", http.StatusBadRequest)
								return
							}
							for _, app := range t.Phone.Apps {
								switch t := app.Type.(type) {
								case *chalgen.App_Tracker:
									if t.Tracker.Password == password {
										// TODO breadchris set message that user is logged in
										sess.TrackerAuthed = true
										sess.NextAttempt = time.Now()
										s.manager.SetChalState(r.Context(), chalId, sess)
									}
								}
							}
							if !sess.TrackerAuthed {
								sess.NextAttempt = time.Now().Add(1 * time.Minute)
								s.manager.SetChalState(r.Context(), chalId, sess)
							}
						}
						for _, app := range t.Phone.Apps {
							app.Url, err = templChals(app.Url)
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
						}
						templ.Handler(tmpl.Page(tmpl.Phone(tmpl.PhoneState{
							Flag:          n.Meta.Flag,
							TrackerLogin:  templ.URL(baseURL + "/tracker/login"),
							TrackerAuthed: sess.TrackerAuthed,
							NextAttempt:   sess.NextAttempt,
						}, t.Phone)), templ.WithErrorHandler(func(r *http.Request, err error) http.Handler {
							slog.Error("failed to template phone", "err", err)
							return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
								w.WriteHeader(http.StatusBadRequest)
								if _, err := io.WriteString(w, err.Error()); err != nil {
									slog.Error("failed to write response", "err", err)
								}
							})
						})).ServeHTTP(w, r)
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

						for _, p := range t.Slack.Channels {
							for _, n := range p.Messages {
								n.Content, err = templChals(n.Content)
								if err != nil {
									http.Error(w, err.Error(), http.StatusInternalServerError)
									return
								}
							}
						}

						userLookup := map[string]*chalgen.User{}
						for _, u := range t.Slack.Users {
							userLookup[u.Username] = u
						}

						templ.Handler(tmpl.Page(tmpl.Chat(tmpl.ChatState{
							Flag:       n.Meta.Flag,
							UserLookup: userLookup,
							Session:    sess,
							URL: tmpl.ChatURL{
								Channel: func(id int) templ.SafeURL {
									return templ.URL(fmt.Sprintf("%s?channel_id=%d", baseURL, id))
								},
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
							p.Content, err = templChals(p.Content)
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
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
					case *chalgen.Challenge_Passshare:
						st := tmpl.PassShareState{
							BaseURL: baseURL,
						}
						if p == "solve" {
							w.Header().Set("Content-Type", "application/json")
							w.WriteHeader(http.StatusOK)
							type req struct {
								ID   int    `json:"id"`
								Hash string `json:"hash"`
							}
							type res struct {
								Success  bool   `json:"success"`
								Password string `json:"password"`
								Flag     string `json:"flag"`
							}
							writeRes := func(s bool, p string) {
								r := res{
									Success:  s,
									Password: p,
									Flag:     n.Meta.Flag,
								}
								b, _ := json.Marshal(r)
								w.Write(b)
							}
							var re req
							if err := json.NewDecoder(r.Body).Decode(&re); err != nil {
								writeRes(false, "")
								return
							}

							for _, sl := range t.Passshare.Solutions {
								if re.ID == int(sl.Id) && re.Hash == sl.Hash {
									writeRes(true, t.Passshare.Password)
									return
								}
							}
							writeRes(false, t.Passshare.Password)
							return
						}
						templ.Handler(tmpl.Page(tmpl.PassShare(st, t.Passshare)), templ.WithErrorHandler(func(r *http.Request, err error) http.Handler {
							slog.Error("failed to template passshare", "err", err)
							return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
								w.WriteHeader(http.StatusBadRequest)
								if _, err := io.WriteString(w, err.Error()); err != nil {
									slog.Error("failed to write response", "err", err)
								}
							})
						})).ServeHTTP(w, r)
						return
					case *chalgen.Challenge_Search:
						s := tmpl.SearchState{
							SearchURL: templ.SafeURL(baseURL + "/search"),
						}
						t.Search.Password, err = templChals(t.Search.Password)
						if err != nil {
							http.Error(w, err.Error(), http.StatusInternalServerError)
							return
						}

						var newEntries []string
						for _, se := range t.Search.Entry {
							se, err = templChals(se)
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
							newEntries = append(newEntries, se)
						}
						t.Search.Entry = newEntries

						if p == "search" {
							err := r.ParseForm()
							if err != nil {
								http.Error(w, err.Error(), http.StatusBadRequest)
								return
							}
							q := r.FormValue("query")
							r, err := performSearch(n.Meta.Flag, t.Search, q)
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
							s.Results = r
						}
						templ.Handler(tmpl.Page(tmpl.Search(s, t.Search))).ServeHTTP(w, r)
						return
					case *chalgen.Challenge_Hashes:
						s := GenerateMD5Hashes(t.Hashes)
						w.Header().Set("Content-Disposition", "attachment; filename=hashes.txt")
						w.Header().Set("Content-Type", "text/plain")
						if p == "rainbow" {
							for _, h := range s {
								_, err := w.Write([]byte(fmt.Sprintf("%s,%s\n", h.Content, h.Hash)))
								if err != nil {
									http.Error(w, err.Error(), http.StatusInternalServerError)
									return
								}
							}
							return
						}
						_, err := w.Write([]byte(n.Meta.Flag + "\n"))
						if err != nil {
							http.Error(w, err.Error(), http.StatusInternalServerError)
							return
						}
						for _, h := range s {
							_, err := w.Write([]byte(h.Hash + "\n"))
							if err != nil {
								http.Error(w, err.Error(), http.StatusInternalServerError)
								return
							}
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
				default:
					slog.Error("challenge type not defined", "compId", compId, "chalId", chalId, "name", n.Meta.Name)
					http.NotFound(w, r)
					return
				}
			}
		}
		slog.Error("challenge not found", "compId", compId, "chalId", chalId)
		http.NotFound(w, r)
	})
}

func (s *Handler) NewPCAP(wr io.Writer, p *chalgen.PCAP) error {
	w := pcapgo.NewWriter(wr)
	err := w.WriteFileHeader(65536, layers.LinkTypeEthernet) // Adjust the snaplen and link type as needed
	if err != nil {
		return err
	}

	// TODO breadchris simulate http traffic?
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
