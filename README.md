# CTFg

Configuration for running CTFd with PostgreSQL and Hasura to expose a GraphQL API.

## todo
* [x] configure hasura with yaml from repo
* [x] get identity to hasura
* [x] authorization rules in hasura
  * [ ] awards
  * [x] challenges
  * [ ] comments
  * [x] config
  * [x] dynamic_challenge
  * [ ] field_entries
  * [ ] fields
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
  * [ ] tokens
  * [x] tracking
  * [x] unlocks
  * [x] users
* [ ] postgres views for ctfd functionality
  * [ ] available hints
    * view with hint id, chal id, relationship only
    * return a subset of columns before purchasing unlock
  * [ ] scoreboard
    * team + score view and user + score view [blog](https://hasura.io/blog/hasura-authorization-system-through-examples/#:~:text=view%20raw-,flatten-roles.sql,-hosted%20with%20%E2%9D%A4%20by)
    * need to account for awards, tokens, hints
* [ ] frontend, codegen
  

## vision
* integrate hasura with ctfd
  * authentication
  * authorization
  * sensible exposed tables
* extend ctfd with hasura mutations / secondary graphql service
* extend ctfd with frontend pages
  * [ ] react
  * [ ] apollo
  * [ ] [uniforms](https://uniforms.tools/docs/api-bridges#graphqlbridge)
  * [ ] populate `hasura/metadata/allow_list.yaml` with `apollo-codegen` output
  


## doing hasura
```
cd hasura; hasura console --address 127.0.0.1
# use http://127.0.0.1:9695/    
git commit hasura/
```