#!/bin/bash

set -euox pipefail

pushd ../../hasura
rm .tmp/*.go || true
hasura actions codegen "$1"
sed -i'' -e 's|^package main|package action|' ".tmp/$1.go"
sed -i'' -e '1s/^/package action/' ".tmp/$1Types.go"
sed -i'' -e "s|ActionPayload|$1ActionPayload|" ".tmp/$1.go"
sed -i'' -e "s|^func handler.*|func makeHandler(logic $1Logic) func(w http.ResponseWriter, r *http.Request) { return func(w http.ResponseWriter, r *http.Request) {|" ".tmp/$1.go"
sed -i'' -e "s|w.Write(data)|w.Write(data)}|" ".tmp/$1.go"
sed -i ''-e '1h;2,$H;$!d;g' -e "s|func main.*}||" ".tmp/$1.go"
cat > ".tmp/$1Interface.go" <<ADDTEXT
$(cat ".tmp/$1.go")

type $1Logic interface{
  $(grep "func" ".tmp/$1.go" | tail -n1 | sed -e "s|{$||" -e "s|^func ||")
}



ADDTEXT

sed -i ''-e '1h;2,$H;$!d;g' -e "s|func $1.*return response.*}||" ".tmp/$1Interface.go"

cat > ".tmp/$1Handler.go" <<ADDTEXT
package handler

$(sed -e '1h;2,$H;$!d;g' -e "s|func $1.*}||" ".tmp/$1Interface.go")
ADDTEXT


cp ".tmp/$1Interface.go" ".tmp/$1Types.go" "../actions/gen/action"
gofmt -w "../actions/gen/action/$1Interface.go" "../actions/gen/action/$1Types.go"
cp -n ".tmp/$1Handler.go" "../actions/handler/$1.go"
gofmt -w "../actions/handler/$1.go"

popd
pushd ..
go mod tidy