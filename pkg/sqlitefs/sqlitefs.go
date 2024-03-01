package sqlitefs

import (
	"database/sql"
	"errors"
	"net/http"
)

type SQLiteFS struct {
	db *sql.DB
}

func NewSQLiteFS(db *sql.DB) (*SQLiteFS, error) {
	fs := &SQLiteFS{db: db}

	err := fs.createTablesIfNeeded()
	if err != nil {
		return nil, err
	}

	return fs, nil
}

func (fs *SQLiteFS) Open(name string) (http.File, error) {
	var exists bool
	err := fs.db.QueryRow("SELECT EXISTS(SELECT 1 FROM file_metadata WHERE path = ?)", name).Scan(&exists)
	if err != nil {
		return nil, err
	}

	if !exists {
		return nil, errors.New("file does not exist")
	}

	return NewSQLiteFile(fs.db, name)
}

func (fs *SQLiteFS) createTablesIfNeeded() error {
	_, err := fs.db.Exec(`
        CREATE TABLE IF NOT EXISTS file_metadata (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT UNIQUE NOT NULL,
            type TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS file_fragments (
            file_id INTEGER NOT NULL,
            fragment_index INTEGER NOT NULL,
            fragment BLOB NOT NULL,
            PRIMARY KEY (file_id, fragment_index),
            FOREIGN KEY (file_id) REFERENCES file_metadata(id)
        );
        CREATE INDEX IF NOT EXISTS idx_file_metadata_path ON file_metadata(path);
        CREATE INDEX IF NOT EXISTS idx_file_fragments_length ON file_fragments(file_id, length(fragment));
    `)

	return err
}
