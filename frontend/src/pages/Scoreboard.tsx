import { gql } from "@apollo/client";
import { useScoreboardQuery } from "../generated";
import ScoreboardTable from "../components/ScoreboardTable";
import React, { lazy } from "react";
import { TimelineContainer } from "../components/TimelineContainer";

const ScoreboardTimeline = lazy(
  () => import("../components/ScoreboardTimeline"),
);

gql`
  query Scoreboard {
    scoreboard {
      team {
        name
        id
        score_timeline {
          event_time
          score
          team_id
        }
      }
    }
  }
`;

export default function Scoreboard() {
  const { data } = useScoreboardQuery({
    pollInterval: 10000,
  });

  return (
    <>
      <TimelineContainer>
        <ScoreboardTimeline scoreboard={data?.scoreboard} />
      </TimelineContainer>
      <ScoreboardTable scoreboard={data?.scoreboard} />
    </>
  );
}
