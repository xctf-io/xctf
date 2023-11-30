package chals

import (
	"unicode"
)

func caesarCipher(input string, shift int) string {
	shift = shift % 26 // Normalize the shift to ensure it's within the alphabet range
	runeShift := rune(shift)

	return string(mapRune([]rune(input), func(r rune) rune {
		if unicode.IsLetter(r) {
			offset := rune('A')
			if unicode.IsLower(r) {
				offset = rune('a')
			}

			// Shift character and wrap around if necessary
			return ((r-offset+runeShift)+26)%26 + offset
		}
		return r
	}))
}

// mapRune applies a function to each rune in a slice of runes.
func mapRune(runes []rune, f func(rune) rune) []rune {
	var result []rune
	for _, r := range runes {
		result = append(result, f(r))
	}
	return result
}
