package chals

import (
	"fmt"
	"github.com/xctf-io/xctf/pkg/gen/chalgen"
	"testing"
)

func TestSearch(t *testing.T) {
	s := &chalgen.Search{
		Entry: []string{"Result 1", "Result 2", "Result 3", "Result 4", "Result 5"},
	}
	r, err := performSearch(s, "Result")
	if err != nil {
		t.Fatal(err)
	}
	fmt.Println(r)

	r, err = performSearch(s, "' or '1' = '1")
	if err != nil {
		t.Fatal(err)
	}
	fmt.Println(r)
}
