# client BUILD
FROM node:lts-alpine as build-client

WORKDIR /build/client

RUN apk add --no-cache make

COPY . /build/
RUN npm install && npm run build && mkdir -p /build/.bin/static && cp -R ./public /build/.bin/static

# API SERVER BUILD
FROM golang:alpine as build-server

WORKDIR /build/

RUN apk add --no-cache --update make gcc musl-dev

COPY --from=build-client /build /build
RUN make .bin/webapp

# RUNTIME ENVIRONMENT
FROM alpine

WORKDIR /opt

RUN apk add --no-cache ca-certificates

RUN addgroup webapp \
    && adduser -H -D webapp webapp \
    && mkdir -p /data \
    && chown -R webapp /data

COPY --chown=webapp:webapp --from=build-server /build/.bin/webapp /opt/webapp

USER webapp

VOLUME "/data"

ENTRYPOINT /opt/webapp
