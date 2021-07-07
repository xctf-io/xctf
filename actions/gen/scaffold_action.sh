#!/bin/bash

set -euox pipefail

pushd ../../hasura
rm -r .tmp || true
mkdir -p .tmp/{gen,handler} || true
hasura actions codegen "$1"

cp .tmp/gen/*.go "../actions/gen/action"
cp -n ".tmp/handler/$1.go" "../actions/handler/$1.go"
gofmt -w "../actions/handler/$1.go" ../actions/gen/action/*.go

popd
pushd ..
go mod tidy