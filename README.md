# CTFg

Configuration for running CTFd with PostgreSQL and Hasura to expose a GraphQL API.

## vision
* integrate hasura with ctfd
  * authentication
  * authorization
  * sensible exposed tables
* extend ctfd with hasura mutations / secondary graphql service
* extend ctfd with frontend pages that use codegen + graphql schema for all types

## dev environment
### docker
#### setup
```
docker-compose up -d
```
#### delete including volumes
```
docker-compose down -v
```
### frontend
#### setup
```
cd frontend
# start docker, code generation, and dev server in watch mode
yarn start 
# (optional) populate the ctfd database with some fake data
yarn fakedata
```
#### fetching data
When you add a `gql` tagged query to a source file, graphql-codegen will automatically generate typed Hooks for performing the query in `generated/graphql.tsx`.


### hasura
```
docker-compose up -d
cd hasura; hasura console --address 127.0.0.1
# use http://127.0.0.1:9695/    
git commit hasura/
```

## todo
* [x] configure hasura with yaml from repo
* [x] get identity to hasura
* [x] authorization rules in hasura (at least read only)
  * [x] awards
  * [x] challenges
  * [x] comments
  * [x] config
  * [x] dynamic_challenge
  * [x] field_entries
  * [x] fields
  * [x] files
  * [x] flags
  * [x] hints
    * unlocked by `unlocks`
  * [x] notifications
  * [x] pages
  * [x] solves
  * [x] submissions
  * [x] tags
  * [x] teams
  * [x] tokens
  * [x] tracking
  * [x] unlocks
  * [x] users
* [ ] postgres views for ctfd functionality
  * [ ] available hints
    * view with hint id, chal id, relationship only
    * return a subset of columns before purchasing unlock
  * [ ] scoreboard
    * team + score view and user + score view [blog](https://hasura.io/blog/hasura-authorization-system-through-examples/#:~:text=view%20raw-,flatten-roles.sql,-hosted%20with%20%E2%9D%A4%20by)
    * need to account for awards, solves
    * view for score over time
  * [ ] prerequsite challenge auth table
    * same blog post
* [x] frontend, codegen
  * [x] react
  * [x] apollo
  * [ ] [uniforms](https://uniforms.tools/docs/api-bridges#graphqlbridge)
  * [ ] populate `hasura/metadata/allow_list.yaml` with `apollo-codegen` output
* [ ] mutation service
  * [ ] submit flag
  * [ ] buy hint
  * [ ] register
    * email allowlist
    * verify emails
  * [ ] create team
    * max number of teams
  * [ ] disband team
    * disableable, check config
  * [ ] generate api key
  * [ ] update user (confirm email)

### phase 2
* [ ] build ui reads
* [ ] build ui writes
* [ ] logic
  * [ ] start
  * [ ] stop
  * [ ] freeze


### phase 3
* [ ] create init db migration at epoch with ctfd schema
* [ ] remove ctfd dependency








view for hint content so can do separate rbac