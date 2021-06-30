CREATE OR REPLACE FUNCTION public.current_user(hasura_session json)
 RETURNS users
 LANGUAGE sql
 STABLE
AS $function$
  select * from users where id = (hasura_session ->> 'x-hasura-user-id')::Int
$function$;
