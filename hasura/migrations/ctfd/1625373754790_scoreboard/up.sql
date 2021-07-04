-- todo how does ctfd do this calculation exactly? need timestamps
--  this is close enough to get the data model down
CREATE VIEW public.scoreboard_user AS
SELECT score_events.team_id, score_events.user_id, sum(score_events.event_value) as score, min(solve_id) as min_solve, min(award_id) as min_award
FROM (
         SELECT team_id, user_id, solves.id as solve_id, NULL as award_id, c.value as event_value
         FROM solves
                  left join challenges c on solves.challenge_id = c.id
         UNION all
         select team_id, user_id, NULL, awards.id, awards.value
         from public.awards
     ) score_events
group by score_events.team_id, score_events.user_id
order by score desc, min_award, min_solve;

CREATE VIEW public.scoreboard AS
SELECT scoreboard_user.team_id, sum(score) as score, min(min_award) as min_award, min(min_solve) as min_solve,
FROM scoreboard_user
group by scoreboard_user.team_id
order by score desc, min_award, min_solve;

