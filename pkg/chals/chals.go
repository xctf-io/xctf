package chals

import (
	"bytes"
	"embed"
	"encoding/base64"
	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
	"github.com/google/gopacket/pcapgo"
	"github.com/xctf-io/xctf/gen/chalgen"
	"github.com/xctf-io/xctf/pkg/bucket"
	"github.com/xctf-io/xctf/pkg/db"
	"github.com/xctf-io/xctf/pkg/models"
	"google.golang.org/protobuf/encoding/protojson"
	"html/template"
	"log/slog"
	"net"
	"net/http"
	"os"
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

func NewHandler(db *db.Service, b *bucket.Builder) *Handler {
	return &Handler{
		db: db,
		b:  b,
	}
}

func (h *Handler) NewPCAP(name string, p *chalgen.PCAP) error {
	filename, err := h.b.File(name + ".pcap")
	if err != nil {
		return err
	}
	f, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer f.Close()

	w := pcapgo.NewWriter(f)
	err = w.WriteFileHeader(65536, layers.LinkTypeEthernet) // Adjust the snaplen and link type as needed
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
			switch t := n.Challenge.(type) {
			case *chalgen.Node_Base64:
				c := t.Base64.Data
				if n.Meta.Flag != "" {
					c += " " + n.Meta.Flag
				}
				challenges[n.Meta.Name] = base64.StdEncoding.EncodeToString([]byte(c))
			case *chalgen.Node_Caesar:
				c := t.Caesar.Plaintext
				if n.Meta.Flag != "" {
					c += " " + n.Meta.Flag
				}
				challenges[n.Meta.Name] = caesarCipher(t.Caesar.Plaintext, int(t.Caesar.Shift))
			}
		}

		for _, n := range graph.Nodes {
			if n.Meta.Id == chalId {
				switch t := n.Challenge.(type) {
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
