package bucket

import (
	"context"
	"fmt"
	"github.com/pkg/errors"
	"gocloud.dev/blob"
	"gocloud.dev/gcerrors"
	"io"
	"net/http"
	"os"
	"time"
)

func (s *Builder) SignedURL(ctx context.Context, objectKey string, duration time.Duration) (string, error) {
	// TODO breadchris ideally file urls also could be real signed URLs. https://github.com/justshare-io/justshare/blob/main/pkg/bucket/http.go#L9
	if s.config.Url.Scheme == "file" {
		return "/upload", nil
	}

	opts := &blob.SignedURLOptions{
		Expiry:      duration,
		Method:      http.MethodPut,
		ContentType: "application/octet-stream",
	}
	url, err := s.Bucket.SignedURL(ctx, objectKey, opts)
	if err != nil {
		if gcerrors.Code(err) == gcerrors.Unimplemented {
			return "", fmt.Errorf("signed URL not supported, or missing permissions: %v", err)
		}
		return "", fmt.Errorf("failed to create signed URL: %v", err)
	}

	return url, nil
}

// TODO breadchris can we use the fs interface? https://github.com/google/go-cloud/pull/3272/files
func (s *Builder) ListBucket(ctx context.Context) ([]os.FileInfo, error) {
	iter := s.Bucket.List(nil)

	var fi []os.FileInfo
	for {
		obj, err := iter.Next(ctx)
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, errors.Wrapf(err, "failed to list Bucket")
		}
		fi = append(fi, &fileInfo{
			name: obj.Key,
			size: obj.Size,
		})
	}
	return fi, nil
}
