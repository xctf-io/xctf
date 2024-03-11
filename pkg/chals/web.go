package chals

import (
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"github.com/xctf-io/xctf/pkg/gen/chalgen"
	"log"
)

func performSearch(flag string, s *chalgen.Search, query string) ([]string, error) {
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	createTableSQL := `CREATE TABLE entries (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
		"value" TEXT
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		return nil, err
	}

	insertSQL := `INSERT INTO entries (value) VALUES (?);`
	for _, e := range s.Entry {
		_, err := db.Exec(insertSQL, e)
		if err != nil {
			return nil, err
		}
	}
	_, err = db.Exec(insertSQL, flag)
	if err != nil {
		return nil, err
	}

	var q string
	if query == "" {
		q = "SELECT value FROM entries"
	} else {
		q = fmt.Sprintf("SELECT value FROM entries WHERE value = '%s'", query)
	}

	rows, err := db.Query(q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []string
	for rows.Next() {
		var value string
		err := rows.Scan(&value)
		if err != nil {
			return nil, err
		}
		results = append(results, value)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal("Error in query rows:", err)
	}
	return results, nil
}
