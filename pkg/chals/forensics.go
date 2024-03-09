package chals

import (
	"bytes"
	"fmt"
	"github.com/alexmullins/zip"
	"github.com/dsoprea/go-exif/v2"
	jpegstructure "github.com/dsoprea/go-jpeg-image-structure"
	"io"
	"os"
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
