package chals

import (
	"bytes"
	"fmt"
	"github.com/alexmullins/zip"
	"github.com/dsoprea/go-exif/v2"
	jpegstructure "github.com/dsoprea/go-jpeg-image-structure"
	"io"
	"net/http"
	"os"
	"time"
)

func modifyAndWriteImage(writer io.Writer, imageURL string) error {
	// Download the image
	response, err := http.Get(imageURL)
	if err != nil {
		return fmt.Errorf("error fetching image: %w", err)
	}
	defer response.Body.Close()

	// Read the entire image into memory
	imageData, err := io.ReadAll(response.Body)
	if err != nil {
		return fmt.Errorf("error reading image data: %w", err)
	}

	// Parse the image
	jmp := jpegstructure.NewJpegMediaParser()
	intfc, err := jmp.ParseBytes(imageData)
	if err != nil {
		return fmt.Errorf("error parsing image: %w", err)
	}

	sl := intfc.(*jpegstructure.SegmentList)

	// Update the EXIF data
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

	// Update the EXIF segment
	err = sl.SetExif(rootIb)
	if err != nil {
		return fmt.Errorf("error setting EXIF: %w", err)
	}

	// Write the updated data
	b := new(bytes.Buffer)
	err = sl.Write(b)
	if err != nil {
		return fmt.Errorf("error writing updated data: %w", err)
	}

	// Finally, write the updated image to the provided writer
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
