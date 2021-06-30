# CTFg

Configuration for running CTFd with PostgreSQL and Hasura to expose a GraphQL API.

## todo
* [x] configure hasura with yaml from repo
* [x] authorization rules in hasura
* [x] get identity to hasura
* [ ] frontend, codegen
  * [ ] populate `hasura/metadata/allow_list.yaml` with `apollo-codegen` output

## vision
* integrate hasura with ctfd
  * authentication
  * authorization
  * sensible exposed tables
* extend ctfd with hasura mutations / secondary graphql service
* extend ctfd with frontend pages written with apollo/react/redwood


## doing hasura
```
cd hasura; hasura console --address 127.0.0.1
# use http://127.0.0.1:9695/    
git commit hasura/
```