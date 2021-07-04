-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE VIEW public.scoreboard AS
SELECT score_events.team_id, sum(score_events.event_value) as score, max(id) as tiebreaker
FROM (
         SELECT team_id, solves.id as id, c.value as event_value
         FROM solves
                  left join challenges c on solves.challenge_id = c.id
         UNION all
         select team_id, 0, awards.value
         from public.awards
     ) score_events
group by team_id
order by score desc, tiebreaker;
