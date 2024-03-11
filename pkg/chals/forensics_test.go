package chals

import (
	exifcommon "github.com/dsoprea/go-exif/v2/common"
	"github.com/dsoprea/go-exif/v3"
	jis "github.com/dsoprea/go-jpeg-image-structure/v2"
	"os"
	"testing"
	"time"
)

func TestCreateImage(t *testing.T) {
	// TODO breadchris how do you handle files during tests?
	// where do they go? folder names? outputs? cleanup?
	fi := "/Users/hacked/Downloads/1999 Happy Meal Lego.jpg"

	intfc, _ := jis.NewJpegMediaParser().ParseFile(fi)
	sl := intfc.(*jis.SegmentList)
	ib, _ := sl.ConstructExifBuilder()
	ifd0Ib, _ := exif.GetOrCreateIbFromRootIb(ib, "IFD0")
	ifdIb, _ := exif.GetOrCreateIbFromRootIb(ib, "IFD")

	g := exif.GpsDegrees{
		Degrees: 11,
		Minutes: 22,
		Seconds: 33,
	}
	gi := exif.GpsInfo{
		Latitude:  g,
		Longitude: g,
	}
	_ = ifd0Ib.SetStandardWithName("Artist", "Test")
	_ = ifdIb.SetStandardWithName("DateTimeOriginal", time.Date(2021, time.January, 1, 0, 0, 0, 0, time.UTC))
	err := ib.AddStandard(exifcommon.IfdPathStandardGps.TagId(), gi)
	if err != nil {
		t.Fatal(err)
	}

	_ = sl.SetExif(ib)
	f, _ := os.OpenFile("/tmp/1999 Happy Meal Lego.jpg", os.O_RDWR|os.O_CREATE, 0755)
	defer f.Close()
	_ = sl.Write(f)
}
