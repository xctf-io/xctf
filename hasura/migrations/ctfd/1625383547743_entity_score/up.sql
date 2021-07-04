CREATE OR REPLACE FUNCTION public.team_score(team_row teams)
    RETURNS int
    LANGUAGE sql
    STABLE
AS
$function$
SELECT score_timeline.score::int FROM public.score_timeline where team_id = team_row.id order by event_time desc limit 1
$function$;


CREATE OR REPLACE FUNCTION public.user_score(user_row users)
    RETURNS int
    LANGUAGE sql
    STABLE
AS
$function$
SELECT score_timeline_user.score::int FROM public.score_timeline_user where user_id = user_row.id order by event_time desc limit 1
$function$;
