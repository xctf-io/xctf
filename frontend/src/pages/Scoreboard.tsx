import { gql } from "@apollo/client";
import React, { lazy, useEffect } from "react";
import ScoreboardTable from "../components/ScoreboardTable";
import { TimelineContainer } from "../components/TimelineContainer";
import { LiveScoreboardDocument, useScoreboardQuery } from "../generated";

const ScoreboardTimeline = lazy(
  () => import("../components/ScoreboardTimeline"),
);

gql`
  fragment ScoreboardAttrs on scoreboard {
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
  query Scoreboard {
    scoreboard {
      ...ScoreboardAttrs
    }
  }

  subscription LiveScoreboard {
    scoreboard {
      ...ScoreboardAttrs
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
      updateQuery: (_, { subscriptionData }) => subscriptionData.data,
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
