import { gql } from "@apollo/client";
import { useScoreboardQuery, useScoreboardTimelineQuery } from "../generated";
import ScoreboardTable from "../components/ScoreboardTable";
import React, { lazy, Suspense } from "react";
import { StyledSpinnerNext } from "baseui/spinner";
import { Block } from "baseui/block";

const ScoreboardTimeline = lazy(
  () => import("../components/ScoreboardTimeline"),
);

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
  const scoreboardQuery = useScoreboardQuery();
  const timelineQuery = useScoreboardTimelineQuery();

  return (
    <>
      <Block
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"25vh"}
        minHeight={"200px"}
      >
        <Suspense fallback={<StyledSpinnerNext />}>
          <ScoreboardTimeline scoreboard={timelineQuery?.data?.scoreboard} />
        </Suspense>
      </Block>
      <ScoreboardTable scoreboard={scoreboardQuery?.data?.scoreboard} />
    </>
  );
}
