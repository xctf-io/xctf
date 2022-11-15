import { gql } from "@apollo/client";
import React, { lazy, useEffect } from "react";
import ScoreboardTable from "./ScoreboardTable";
import { TimelineContainer } from "../teams/TimelineContainer";
import { LiveScoreboardDocument, useScoreboardQuery } from "../../generated";

const ScoreboardTimeline = lazy(
  () => import("./ScoreboardTimeline"),
);

gql`
    query Scoreboard {
        scoreboard(limit: 10) {
            ...ScoreboardTable
            ...ScoreboardTimeline
        }
    }

    subscription LiveScoreboard {
        scoreboard(limit: 10) {
            ...ScoreboardTable
            ...ScoreboardTimeline
        }
    }
`;

// eslint-disable-next-line
const useMountEffect = (fun: any) => useEffect(fun, []);

export default function Scoreboard() {
  const { data, subscribeToMore } = useScoreboardQuery();
  useMountEffect(() => {
    subscribeToMore({
      document: LiveScoreboardDocument,
      updateQuery: (_, n) => n.subscriptionData.data,
    });
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
