# CTFg

Configuration for running CTFd with PostgreSQL and Hasura to expose a GraphQL API.

## todo
* [x] configure hasura with yaml from repo
* [x] authorization rules in hasura
* [x] get identity to hasura
* [ ] frontend, codegen
  * [ ] populate `hasura/metadata/actions.graphql` with `apollo-codegen` output

## vision
* integrate hasura with ctfd
  * authentication
  * authorization
  * sensible exposed tables
* extend ctfd with hasura mutations / secondary graphql service
* extend ctfd with frontend pages written with apollo/react/redwood


## doing hasura
```
docker-compose up -d
# configure hasura on localhost:8001
hasura metadata export
git commit hasura/
```