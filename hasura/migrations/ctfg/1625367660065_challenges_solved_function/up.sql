CREATE OR REPLACE FUNCTION public.challenges_solved(challenge_row public.challenge, hasura_session json)
    RETURNS boolean
    LANGUAGE sql
    STABLE
AS
$function$
SELECT EXISTS(
               select 1
               from solve
               where user_id = (hasura_session ->> 'x-hasura-user-id')::uuid
                  or team_id = (
                   select team_id from public.user where kratos_id = (hasura_session ->> 'x-hasura-user-id')::uuid
               )
           );
$function$;
