package chals

import (
	"bytes"
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"github.com/alexmullins/zip"
	"github.com/dsoprea/go-exif/v2"
	jpegstructure "github.com/dsoprea/go-jpeg-image-structure"
	"github.com/xctf-io/xctf/pkg/gen/chalgen"
	"io"
	"math/rand"
	"os"
	"strings"
	"time"
)

func modifyAndWriteImage(writer io.Writer, r io.Reader) error {
	imageData, err := io.ReadAll(r)
	if err != nil {
		return fmt.Errorf("error reading image data: %w", err)
	}

	jmp := jpegstructure.NewJpegMediaParser()
	intfc, err := jmp.ParseBytes(imageData)
	if err != nil {
		return fmt.Errorf("error parsing image: %w", err)
	}

	sl := intfc.(*jpegstructure.SegmentList)

	rootIb, err := sl.ConstructExifBuilder()
	if err != nil {
		return fmt.Errorf("error constructing EXIF builder: %w", err)
	}

	ifdPath := "IFD0"
	ifdIb, err := exif.GetOrCreateIbFromRootIb(rootIb, ifdPath)
	if err != nil {
		return fmt.Errorf("error getting or creating IFD builder: %w", err)
	}

	now := time.Now().UTC()
	updatedTimestampPhrase := exif.ExifFullTimestampString(now)

	err = ifdIb.SetStandardWithName("DateTime", updatedTimestampPhrase)
	if err != nil {
		return fmt.Errorf("error setting EXIF tag: %w", err)
	}

	err = sl.SetExif(rootIb)
	if err != nil {
		return fmt.Errorf("error setting EXIF: %w", err)
	}

	b := new(bytes.Buffer)
	err = sl.Write(b)
	if err != nil {
		return fmt.Errorf("error writing updated data: %w", err)
	}

	_, err = writer.Write(b.Bytes())
	return err
}

func createEncryptedZip(zipFilename, password string, files map[string]string) error {
	buf := new(bytes.Buffer)

	w := zip.NewWriter(buf)

	for filename, content := range files {
		f, err := w.Encrypt(filename, password)
		if err != nil {
			return fmt.Errorf("failed to create entry for %s: %w", filename, err)
		}
		_, err = f.Write([]byte(content))
		if err != nil {
			return fmt.Errorf("failed to write content for %s: %w", filename, err)
		}
	}

	if err := w.Close(); err != nil {
		return fmt.Errorf("failed to close ZIP writer: %w", err)
	}

	if err := os.WriteFile(zipFilename, buf.Bytes(), 0644); err != nil {
		return fmt.Errorf("failed to write ZIP file: %w", err)
	}

	return nil
}

type MD5Hash struct {
	Hash    string
	Content string
}

func GenerateMD5Hashes(hashes *chalgen.Hashes) []MD5Hash {
	r := rand.New(rand.NewSource(int64(hashCode(hashes.Seed))))

	var result []MD5Hash
	for i := int32(0); i < hashes.Count; i++ {
		str := generateRandomStringFromFormat(r, hashes.Format)
		for _, override := range hashes.Overrides {
			if override.Index == i {
				str = override.Text
				break
			}
		}
		hash := md5.Sum([]byte(str))
		result = append(result, MD5Hash{
			Hash:    hex.EncodeToString(hash[:]),
			Content: str,
		})
	}

	return result
}

func generateRandomStringFromFormat(r *rand.Rand, format string) string {
	var result strings.Builder
	for _, char := range format {
		if char == '#' {
			result.WriteByte(randomChar(r))
		} else {
			result.WriteRune(char)
		}
	}
	return result.String()
}

func randomChar(r *rand.Rand) byte {
	charSet := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	return charSet[r.Intn(len(charSet))]
}

func hashCode(s string) int {
	h := 0
	for i := 0; i < len(s); i++ {
		h = 31*h + int(s[i])
	}
	return h
}
