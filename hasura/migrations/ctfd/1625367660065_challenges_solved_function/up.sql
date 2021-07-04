CREATE OR REPLACE FUNCTION public.challenges_solved(challenge_row challenges, hasura_session json)
    RETURNS boolean
    LANGUAGE sql
    STABLE
AS
$function$
SELECT EXISTS(
               select 1
               from solves
               where user_id = (hasura_session ->> 'x-hasura-user-id')::Int
                  or team_id =
                     (select team_id from public.users where user_id = (hasura_session ->> 'x-hasura-user-id')::Int)
           );
$function$;
