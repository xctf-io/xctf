CREATE OR REPLACE FUNCTION public.user_avatar(user_row users)
    RETURNS text
    LANGUAGE sql
    STABLE
AS
$function$
SELECT 'https://www.gravatar.com/avatar/' || MD5(user_row.email)
$function$;
