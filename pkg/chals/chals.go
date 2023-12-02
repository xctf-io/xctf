package chals

import (
	"bytes"
	"embed"
	"encoding/base64"
	"fmt"
	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
	"github.com/google/gopacket/pcapgo"
	"github.com/gosimple/slug"
	"github.com/xctf-io/xctf/gen/chalgen"
	"github.com/xctf-io/xctf/pkg/bucket"
	"github.com/xctf-io/xctf/pkg/db"
	"github.com/xctf-io/xctf/pkg/models"
	"google.golang.org/protobuf/encoding/protojson"
	"html/template"
	"io"
	"log/slog"
	"net"
	"net/http"
	"net/url"
	"strings"
	ttemplate "text/template"
	"time"
)

//go:embed tmpl/*
var Chals embed.FS

type Handler struct {
	db *db.Service
	b  *bucket.Builder
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

func NewHandler(db *db.Service, b *bucket.Builder) *Handler {
	return &Handler{
		db: db,
		b:  b,
	}
}

func (h *Handler) NewPCAP(wr io.Writer, p *chalgen.PCAP) error {
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

		// TODO breadchris find dependencies of referenced challenge and build those
		challenges := map[string]string{}
		for _, n := range graph.Nodes {
			view := ""
			switch t := n.Challenge.(type) {
			case *chalgen.Node_Base64:
				c := t.Base64.Data
				if n.Meta.Flag != "" {
					c += " " + n.Meta.Flag
				}
				view = base64.StdEncoding.EncodeToString([]byte(c))
			case *chalgen.Node_Caesar:
				c := t.Caesar.Plaintext
				if n.Meta.Flag != "" {
					c += " " + n.Meta.Flag
				}
				view = caesarCipher(c, int(t.Caesar.Shift))
			case *chalgen.Node_Pcap:
				view = ChalURL(compId, n.Meta.Id, r.Host)
			}
			if view != "" {
				challenges[n.Meta.Name] = view
			}
		}

		for _, n := range graph.Nodes {
			if n.Meta.Id == chalId {
				s := slug.Make(n.Meta.Name)
				switch t := n.Challenge.(type) {
				case *chalgen.Node_Pcap:
					w.Header().Set("Content-Type", "application/vnd.tcpdump.pcap")
					w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s.pcap", s))
					err = h.NewPCAP(w, t.Pcap)
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
					}
				case *chalgen.Node_Twitter:
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
