#!/bin/bash

set -euox pipefail

pushd ../../hasura
rm .tmp/*.go || true
hasura actions codegen "$1"
sed -i'' -e 's|^package main|package action|' ".tmp/$1.go"
sed -i'' -e '1s/^/package action/' ".tmp/$1Types.go"
sed -i'' -e "s|ActionPayload|$1ActionPayload|" ".tmp/$1.go"
sed -i'' -e "s|^func handler.*|func make$1Handler(logic $1Logic) func(w http.ResponseWriter, r *http.Request) { return func(w http.ResponseWriter, r *http.Request) {|" ".tmp/$1.go"
sed -i'' -e "s|w.Write(data)|w.Write(data)}|" ".tmp/$1.go"
sed -i'' -e "s|:= $1|:= logic.$1|" ".tmp/$1.go"
sed -i'' -e "s|GraphQLError struct|graphQLError$1 struct|" ".tmp/$1.go"
sed -i ''-e '1h;2,$H;$!d;g' -e "s|func main.*}||" ".tmp/$1.go"
cat > ".tmp/$1Interface.go" <<ADDTEXT
$(cat ".tmp/$1.go")

type $1Logic interface{
  $(grep "func $1" ".tmp/$1.go" | sed -e "s|{$||" -e "s|^func ||")
}

var $1Module = fx.Options(
  fx.Provide(make$1Handler
)


func create$1HandlerFuncPair() types.HTTPHandlerFuncPatternPair {
 return types.HTTPHandlerFuncPatternPair{
     Pattern: "/todo pattern",
     Handler: $1,
 }
}

var $1ActionModule = fx.Provide(
    fx.Annotated{
        Group: groups.ExternalHTTPHandlerFunctions,
        Target: create$1HandlerFuncPair, // function pointer, will be called by Uber-FX
    }
)

ADDTEXT

cat > ".tmp/$1Handler.go" <<ADDTEXT
package handler

ADDTEXT


cp ".tmp/$1Interface.go" "../actions/gen/action"
cp ".tmp/$1Types.go" "../actions/gen/action/types_gen.go"
gofmt -w "../actions/gen/action/$1Interface.go" "../actions/gen/action/types_gen.go"
cp -n ".tmp/$1Handler.go" "../actions/handler/$1.go"
gofmt -w "../actions/handler/$1.go"

popd
pushd ..
go mod tidy