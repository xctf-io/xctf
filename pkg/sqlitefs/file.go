package sqlitefs

import (
	"database/sql"
	"github.com/pkg/errors"
	"io"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type SQLiteFile struct {
	db     *sql.DB
	path   string
	offset int64
	size   int64
}

func NewSQLiteFile(db *sql.DB, path string) (*SQLiteFile, error) {
	file := &SQLiteFile{
		db:   db,
		path: path,
	}

	if path != "/" {
		size, err := file.getTotalSize()
		if err != nil {
			return nil, err
		}
		file.size = size
	}

	return file, nil
}

func (f *SQLiteFile) Read(p []byte) (int, error) {
	bytesReadTotal := 0
	for {
		fragmentIndex := f.offset / fragmentSize
		internalOffset := f.offset % fragmentSize

		readLength := min(fragmentSize-internalOffset, int64(len(p))-int64(bytesReadTotal))

		if f.offset >= f.size {
			if bytesReadTotal == 0 {
				return 0, io.EOF
			}
			return bytesReadTotal, nil
		}

		query := `SELECT SUBSTR(fragment, ?, ?) FROM file_fragments WHERE file_id = (SELECT id FROM file_metadata WHERE path = ?) AND fragment_index = ?`
		row := f.db.QueryRow(query, internalOffset+1, readLength, f.path, fragmentIndex)

		var fragment []byte
		err := row.Scan(&fragment)
		if err != nil {
			if err == sql.ErrNoRows {
				if bytesReadTotal > 0 {
					return bytesReadTotal, nil
				}
				return 0, io.EOF
			}
			return bytesReadTotal, err
		}

		bytesRead := copy(p[bytesReadTotal:], fragment)
		bytesReadTotal += bytesRead
		f.offset += int64(bytesRead)

		if bytesRead == 0 {
			if f.offset >= f.size {
				return bytesReadTotal, nil
			}
			continue
		}

		if bytesReadTotal == len(p) {
			break
		}
	}
	return bytesReadTotal, nil
}

func (f *SQLiteFile) Seek(offset int64, whence int) (int64, error) {
	var newOffset int64
	switch whence {
	case io.SeekStart:
		newOffset = offset
	case io.SeekCurrent:
		newOffset = f.offset + offset
	case io.SeekEnd:
		totalSize, err := f.getTotalSize()
		if err != nil {
			return 0, err
		}
		newOffset = totalSize + offset
	default:
		return 0, errors.New("sqlitefs: invalid whence")
	}

	if newOffset < 0 {
		return 0, errors.New("sqlitefs: negative position")
	}

	f.offset = newOffset
	return newOffset, nil
}

func (f *SQLiteFile) Readdir(count int) ([]os.FileInfo, error) {
	if !strings.HasSuffix(f.path, "/") {
		f.path += "/"
	}

	query := `SELECT path, type FROM file_metadata WHERE path LIKE ?`
	rows, err := f.db.Query(query, f.path+"%")
	if err != nil {
		return nil, errors.Wrapf(err, "failed to query file_metadata")
	}
	defer rows.Close()

	var fileInfos []os.FileInfo
	var path, fileType string

	for rows.Next() {
		err := rows.Scan(&path, &fileType)
		if err != nil {
			return nil, errors.Wrapf(err, "failed to scan rows")
		}

		fileInfo, err := f.createFileInfo(path)
		if err != nil {
			return nil, errors.Wrapf(err, "failed to create file info")
		}

		fileInfos = append(fileInfos, fileInfo)

		if count > 0 && len(fileInfos) >= count {
			break
		}
	}

	if err := rows.Err(); err != nil {
		return nil, errors.Wrapf(err, "error while scanning rows")
	}

	return fileInfos, nil
}

func (f *SQLiteFile) Stat() (os.FileInfo, error) {
	return f.createFileInfo(f.path)
}

func (f *SQLiteFile) Close() error {
	return nil
}

func (f *SQLiteFile) Move(newPath string) error {
	tx, err := f.db.Begin()
	if err != nil {
		return err
	}

	renameQuery := `UPDATE file_metadata SET path = ? WHERE path = ?`
	_, err = tx.Exec(renameQuery, newPath, f.path)
	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		return err
	}
	f.path = newPath
	return nil
}

func (f *SQLiteFile) Remove() error {
	tx, err := f.db.Begin()
	if err != nil {
		return err
	}

	deleteFragmentsQuery := `DELETE FROM file_fragments WHERE file_id = (SELECT id FROM file_metadata WHERE path = ?)`
	_, err = tx.Exec(deleteFragmentsQuery, f.path)
	if err != nil {
		tx.Rollback()
		return err
	}

	deleteMetadataQuery := `DELETE FROM file_metadata WHERE path = ?`
	_, err = tx.Exec(deleteMetadataQuery, f.path)
	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}

func (f *SQLiteFile) GetAllFiles() ([]os.FileInfo, error) {
	query := `SELECT path FROM file_metadata`
	rows, err := f.db.Query(query)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to query file_metadata for all files")
	}
	defer rows.Close()

	var fileInfos []os.FileInfo
	var path string

	for rows.Next() {
		err := rows.Scan(&path)
		if err != nil {
			return nil, errors.Wrapf(err, "failed to scan row")
		}

		fileInfo, err := f.createFileInfo(path)
		if err != nil {
			return nil, errors.Wrapf(err, "failed to create file info for path: %s", path)
		}

		fileInfos = append(fileInfos, fileInfo)
	}

	if err := rows.Err(); err != nil {
		return nil, errors.Wrapf(err, "error encountered during row iteration")
	}

	return fileInfos, nil
}

func (f *SQLiteFile) createFileInfo(path string) (os.FileInfo, error) {
	isDir := strings.HasSuffix(path, "/")

	var size int64

	if !isDir {
		query := `SELECT SUM(LENGTH(fragment)) FROM file_fragments WHERE file_id = (SELECT id FROM file_metadata WHERE path = ?)`
		err := f.db.QueryRow(query, path).Scan(&size)
		if err != nil {
			return nil, err
		}
	}

	name := filepath.Base(path)

	return &fileInfo{
		name:    name,
		size:    size,
		modTime: time.Time{},
		isDir:   isDir,
	}, nil
}

func (f *SQLiteFile) getTotalSize() (int64, error) {
	query := `
	SELECT COUNT(*), COALESCE(LENGTH(fragment), 0)
	FROM file_fragments
	WHERE file_id = (SELECT id FROM file_metadata WHERE path = ?)
	ORDER BY fragment_index DESC
	LIMIT 1
	`

	rows, err := f.db.Query(query, f.path)
	if err != nil {
		return 0, errors.Wrapf(err, "failed to query file: %s", f.path)
	}

	for rows.Next() {
		var count, lastFragmentSize int
		err = rows.Scan(&count, &lastFragmentSize)
		if err != nil {
			return 0, err
		}
		totalSize := int64((count-1)*fragmentSize + lastFragmentSize)
		return totalSize, nil
	}
	return 0, errors.Errorf("could not find file fragments for path: %s", f.path)
}
