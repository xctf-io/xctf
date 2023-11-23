FROM node:lts-alpine as client

COPY client /build/client
COPY package.json /build/package.json
COPY package-lock.json /build/package-lock.json

WORKDIR /build

RUN npm i && npm run build

FROM golang:alpine as server

WORKDIR /build/

COPY . /build
COPY --from=client /build/client/public/build /build/client/public/build

RUN go build -o ctfg main.go

FROM alpine

WORKDIR /opt

RUN apk add --no-cache ca-certificates

COPY --from=server /build/ctfg /opt/ctfg
ADD Home.md /opt/Home.md

ENTRYPOINT /opt/ctfg
