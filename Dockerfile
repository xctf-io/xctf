FROM node:lts-alpine as client

COPY client /build/client
COPY package.json /build/package.json
COPY package-lock.json /build/package-lock.json

WORKDIR /build

RUN npm i && npm run build

FROM golang:1.21 as server

WORKDIR /build/

COPY . /build
COPY --from=client /build/client/public/build /build/client/public/build

RUN CGO_ENABLED=1 go build -o xctf main.go

FROM alpine

WORKDIR /opt

RUN apk add --no-cache ca-certificates

COPY --from=server /build/xctf /opt/xctf

ENTRYPOINT /opt/xctf
