import { gql } from "@apollo/client";
import { useScoreboardQuery, useScoreboardTimelineQuery } from "../generated";
import ScoreboardTable from "../components/ScoreboardTable";
import { lazy, Suspense } from "react";
import { useStyletron } from "baseui";
import { StyledSpinnerNext } from "baseui/spinner";

const ScoreboardTimeline = lazy(() => import("../components/ScoreboardTimeline"));

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
  const [css] = useStyletron();

  return (
    <>
      <div
        className={css({
          height: "25vh",
          minHeight: "200px",
        })}
      >
        <Suspense fallback={<StyledSpinnerNext/>}>
      <ScoreboardTimeline scoreboard={timelineQuery?.data?.score_timeline} />
        </Suspense>
      </div>
      <ScoreboardTable scoreboard={scoreboardQuery?.data?.scoreboard} />
    </>
  );
}
