CREATE OR REPLACE FUNCTION public.user_avatar(user_row public."user")
    RETURNS text
    LANGUAGE sql
    STABLE
AS
$function$
SELECT 'https://www.gravatar.com/avatar/' || MD5(user_row.email) || '?d=404'
$function$;