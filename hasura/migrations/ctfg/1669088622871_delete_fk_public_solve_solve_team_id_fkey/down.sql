alter table "public"."solve"
  add constraint "solve_team_id_fkey"
  foreign key ("team_id")
  references "public"."team"
  ("id") on update no action on delete no action;
