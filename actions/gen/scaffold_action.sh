#!/bin/bash

set -euo pipefail

pushd ../../hasura
rm -r .tmp || true
mkdir -p .tmp/{gen,handler} || true
hasura actions codegen "$@"

cp .tmp/gen/*.go "../actions/gen/action"
cp -n ".tmp/handler/$1.go"  ".tmp/handler/$1.graphql" "../actions/handler/"
gofmt -w "../actions/handler/$1.go" ../actions/gen/action/*.go
popd