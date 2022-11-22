alter table "public"."solve" add constraint "solves_challenge_id_team_id_key" unique (challenge_id, team_id);
alter table "public"."solve" alter column "team_id" drop not null;
alter table "public"."solve" add column "team_id" uuid;
