package chals

import (
	"github.com/dsoprea/go-exif/v2"
	"os"
	"testing"
)

func TestCreateImage(t *testing.T) {
	// TODO breadchris how do you handle files during tests?
	// where do they go? folder names? outputs? cleanup?
	f, err := os.Open("/Users/hacked/Downloads/1999 Happy Meal Lego.jpg")
	if err != nil {
		t.Fatal(err)
	}
	o, err := os.Create("/tmp/out.jpg")
	if err != nil {
		t.Fatal(err)
	}
	r, err := exif.SearchAndExtractExifWithReader(f)
	if err != nil {
		t.Fatal(err)
	}
	eh, err := exif.ParseExifHeader(r)
	if err != nil {
		t.Fatal(err)
	}
	println(eh.String())

	err = modifyAndWriteImage(o, f)
	if err != nil {
		t.Fatal(err)
	}
}
