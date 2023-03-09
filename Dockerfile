FROM node:lts-alpine as client

COPY client /build
WORKDIR /build

RUN yarn && yarn run build

FROM golang:alpine as server

WORKDIR /build/

COPY . /build
COPY --from=client /build/public/build /build/client/public/build

RUN go build -o ctfg cmd/main.go

FROM alpine

WORKDIR /opt

RUN apk add --no-cache ca-certificates

COPY --from=server /build/ctfg /opt/ctfg

ENTRYPOINT /opt/ctfg
