import { gql } from "@apollo/client";
import { LiveScoreboardDocument, useScoreboardQuery } from "../generated";
import ScoreboardTable from "../components/ScoreboardTable";
import React, { lazy } from "react";
import { TimelineContainer } from "../components/TimelineContainer";

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

export default function Scoreboard() {
  const { data, subscribeToMore } = useScoreboardQuery({
    pollInterval: 10000,
  });
  useMountEffect(() => {
    subscribeToMore({
      document: LiveScoreboardDocument,
      updateQuery: (prev, { subscriptionData }) => {

        console.log(subscriptionData);
        return prev;
      },
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
