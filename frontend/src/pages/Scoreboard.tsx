import { gql } from "@apollo/client";
import { useScoreboardQuery, useScoreboardTimelineQuery } from "../generated";
import { ScoreboardTimeline } from "../components/ScoreboardTimeline";
import { ScoreboardTable } from "../components/ScoreboardTable";

gql`
    query Scoreboard {
        scoreboard {
            score
            team {
                name
                id
            }
        }
    }
`;

gql`
    query ScoreboardTimeline {
        score_timeline {
            event_time
            score
            team_id
        }
    }
`;

export default function Scoreboard() {
    const scoreboardQuery = useScoreboardQuery();
    const timelineQuery = useScoreboardTimelineQuery();

  return (
    <>
        <ScoreboardTimeline scoreboard={timelineQuery?.data?.score_timeline} />
        <ScoreboardTable scoreboard={scoreboardQuery?.data?.scoreboard}/>
    </>
  )

}
