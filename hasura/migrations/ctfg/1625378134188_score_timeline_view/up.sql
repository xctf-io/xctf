CREATE MATERIALIZED VIEW public.score_event AS
SELECT team_id, user_id, submission.date as event_time, c.value as event_value
FROM public.submission
         left join public.challenge c on public.submission.challenge_id = c.id
where submission.type = 'correct'
UNION all
select team_id, user_id, award.date, award.value
from public.award;

CREATE MATERIALIZED VIEW public.score_timeline_user AS
SELECT score_event.event_time,
       score_event.team_id,
       score_event.user_id,
       sum(score_event.event_value)
       over (partition by team_id, user_id order by score_event.event_time rows between unbounded preceding and current row) as score
FROM public.score_event;

CREATE MATERIALIZED VIEW public.score_timeline AS
SELECT score_event.event_time,
       score_event.team_id,
       sum(score_event.event_value)
       over (partition by team_id order by score_event.event_time rows between unbounded preceding and current row) as score
FROM public.score_event;

-- todo how does ctfd do this calculation exactly? need timestamps
--  this is close enough to get the data model down
CREATE MATERIALIZED VIEW public.scoreboard_user AS
SELECT se.*, row_number() over (order by score desc, max_time) as rank
from (
         SELECT score_event.team_id,
                score_event.user_id,
                sum(score_event.event_value) as score,
                max(score_event.event_time)  as max_time
         FROM public.score_event
         group by score_event.team_id, score_event.user_id) se;

CREATE MATERIALIZED VIEW public.scoreboard AS
SELECT se.*, row_number() over (order by score desc, max_time) as rank
from (
         SELECT score_event.team_id,
                sum(score_event.event_value) as score,
                max(score_event.event_time)  as max_time
         FROM public.score_event
         group by score_event.team_id) se;

-- triggers for score events
CREATE OR REPLACE FUNCTION refresh_score_events()
    RETURNS TRIGGER LANGUAGE plpgsql
AS $$
BEGIN
    REFRESH MATERIALIZED VIEW public.score_event;
    REFRESH MATERIALIZED VIEW public.score_timeline_user;
    REFRESH MATERIALIZED VIEW public.score_timeline;
    REFRESH MATERIALIZED VIEW public.scoreboard_user;
    REFRESH MATERIALIZED VIEW public.scoreboard;
    RETURN NULL;
END $$;

CREATE TRIGGER refresh_score_events_solves
    AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE
    ON public.solve
    FOR EACH STATEMENT
EXECUTE PROCEDURE refresh_score_events();

CREATE TRIGGER refresh_score_events_awards
    AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE
    ON public.award
    FOR EACH STATEMENT
EXECUTE PROCEDURE refresh_score_events();

CREATE TRIGGER refresh_score_events_submissions
    AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE
    ON public.submission
    FOR EACH STATEMENT
EXECUTE PROCEDURE refresh_score_events();

-- end triggers for score events

CREATE UNIQUE INDEX score_events_all_uniq_idx ON public.score_event (event_time, team_id, user_id, event_value);
-- -- score attribute functions
CREATE OR REPLACE FUNCTION public.team_score(team_row public.team)
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

CREATE OR REPLACE FUNCTION public.user_score(user_row public.user)
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