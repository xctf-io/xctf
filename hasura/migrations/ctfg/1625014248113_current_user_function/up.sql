CREATE OR REPLACE FUNCTION public.current_user(hasura_session json)
    RETURNS SETOF public.user
    LANGUAGE sql
    STABLE
AS $function$
select * from public.user where kratos_id = (hasura_session ->> 'x-hasura-user-id')::uuid
$function$;
