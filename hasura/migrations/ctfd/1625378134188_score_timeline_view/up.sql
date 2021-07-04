CREATE VIEW score_events AS
SELECT team_id, user_id, submissions.date as event_time, c.value as event_value
FROM public.submissions
         left join challenges c on submissions.challenge_id = c.id
where submissions.type = 'correct'
UNION all
select team_id, user_id, awards.date, awards.value
from public.awards;

CREATE VIEW public.score_timeline_user AS
SELECT score_events.team_id,
       score_events.user_id,
       sum(score_events.event_value)
       over (partition by team_id, user_id order by score_events.event_time rows between unbounded preceding and current row) as total
FROM score_events;

CREATE VIEW public.score_timeline AS
SELECT score_events.team_id,
       sum(score_events.event_value)
       over (partition by team_id order by score_events.event_time rows between unbounded preceding and current row) as total
FROM score_events;
