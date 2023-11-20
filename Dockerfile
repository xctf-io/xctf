FROM node:lts-alpine as client

RUN apk add git

COPY client /build
WORKDIR /build

RUN npm i && npm run build

FROM golang:alpine as server

WORKDIR /build/

COPY . /build
COPY --from=client /build/public/build /build/client/public/build

RUN go build -o ctfg cmd/main.go

FROM alpine

WORKDIR /opt

RUN apk add --no-cache ca-certificates

COPY --from=server /build/ctfg /opt/ctfg
ADD Home.md /opt/Home.md

ENTRYPOINT /opt/ctfg
