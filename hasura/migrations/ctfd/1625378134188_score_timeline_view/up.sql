CREATE MATERIALIZED VIEW public.score_events AS
SELECT team_id, user_id, submissions.date as event_time, c.value as event_value
FROM public.submissions
         left join challenges c on submissions.challenge_id = c.id
where submissions.type = 'correct'
UNION all
select team_id, user_id, awards.date, awards.value
from public.awards;

CREATE MATERIALIZED VIEW public.score_timeline_user AS
SELECT score_events.event_time,
       score_events.team_id,
       score_events.user_id,
       sum(score_events.event_value)
       over (partition by team_id, user_id order by score_events.event_time rows between unbounded preceding and current row) as score
FROM score_events;

CREATE MATERIALIZED VIEW public.score_timeline AS
SELECT score_events.event_time,
       score_events.team_id,
       sum(score_events.event_value)
       over (partition by team_id order by score_events.event_time rows between unbounded preceding and current row) as score
FROM score_events;

-- todo how does ctfd do this calculation exactly? need timestamps
--  this is close enough to get the data model down
CREATE MATERIALIZED VIEW public.scoreboard_user AS
SELECT score_events.team_id,
       score_events.user_id,
       sum(score_events.event_value) as score,
       max(score_events.event_time)  as max_time
FROM score_events
group by score_events.team_id, score_events.user_id
order by score desc, max_time;

CREATE MATERIALIZED VIEW public.scoreboard AS
SELECT score_events.team_id, sum(score_events.event_value) as score, max(score_events.event_time) as max_time
FROM score_events
group by score_events.team_id
order by score desc, max_time;

-- triggers for score events
CREATE OR REPLACE FUNCTION refresh_score_events()
    RETURNS TRIGGER LANGUAGE plpgsql
AS $$
BEGIN
    REFRESH MATERIALIZED VIEW public.score_events;
    REFRESH MATERIALIZED VIEW public.score_timeline_user;
    REFRESH MATERIALIZED VIEW public.score_timeline;
    REFRESH MATERIALIZED VIEW public.scoreboard_user;
    REFRESH MATERIALIZED VIEW public.scoreboard;
    RETURN NULL;
END $$;

CREATE TRIGGER refresh_score_events
    AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE
    ON public.solves
    FOR EACH STATEMENT
EXECUTE PROCEDURE refresh_score_events();

CREATE TRIGGER refresh_score_events
    AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE
    ON public.awards
    FOR EACH STATEMENT
EXECUTE PROCEDURE refresh_score_events();

CREATE TRIGGER refresh_score_events
    AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE
    ON public.submissions
    FOR EACH STATEMENT
EXECUTE PROCEDURE refresh_score_events();

-- end triggers for score events

CREATE UNIQUE INDEX score_events_all_uniq_idx ON score_events (event_time, team_id, user_id, event_value);

-- score attribute functions
CREATE OR REPLACE FUNCTION public.team_score(team_row teams)
    RETURNS int
    LANGUAGE sql
    STABLE
AS
$function$
SELECT score_timeline.score::int
FROM public.score_timeline
where team_id = team_row.id
order by event_time desc
limit 1
$function$;

CREATE OR REPLACE FUNCTION public.user_score(user_row users)
    RETURNS int
    LANGUAGE sql
    STABLE
AS
$function$
SELECT score_timeline_user.score::int
FROM public.score_timeline_user
where user_id = user_row.id
order by event_time desc
limit 1
$function$;