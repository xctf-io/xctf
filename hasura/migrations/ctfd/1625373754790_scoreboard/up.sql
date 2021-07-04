CREATE VIEW public.scoreboard_user AS
SELECT score_events.team_id, score_events.user_id, sum(score_events.event_value) as score, max(id) as tiebreaker
FROM (
         SELECT team_id, user_id, solves.id as id, c.value as event_value
         FROM solves
                  left join challenges c on solves.challenge_id = c.id
         UNION all
         select team_id, user_id, 0, awards.value
         from public.awards
     ) score_events
group by score_events.team_id, score_events.user_id
order by score desc, tiebreaker;

CREATE VIEW public.scoreboard AS
SELECT scoreboard_user.team_id, sum(score) as score, max(tiebreaker) as tiebreaker
FROM scoreboard_user
group by scoreboard_user.team_id
order by score desc, tiebreaker;

