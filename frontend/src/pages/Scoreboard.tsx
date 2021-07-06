import { gql } from "@apollo/client";
import { useScoreboardQuery } from "../generated";
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
  const { data } = useScoreboardQuery();

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
          <ScoreboardTimeline scoreboard={data?.scoreboard} />
        </Suspense>
      </Block>
      <ScoreboardTable scoreboard={data?.scoreboard} />
    </>
  );
}
