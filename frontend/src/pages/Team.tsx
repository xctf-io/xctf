import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";
import { useParams } from "react-router-dom";
import { Display2, Display4, H1 } from "baseui/typography";
import { Block } from "baseui/block";
import { TeamMember } from "../components/TeamMember";
import "../../node_modules/react-vis/dist/style.css";
import React, { lazy, Suspense } from "react";
import { StyledSpinnerNext } from "baseui/spinner";
import { TimelineContainer } from "../components/TimelineContainer";

const TeamTimeline = lazy(() => import("../components/TeamTimeline"));

gql`
  fragment SingleTeam on teams {
    id
    name
    affiliation
    bracket
    country
    created
    website
    members {
      id
      name
      affiliation
      avatar
      bracket
      country
      type
      website
      captain_of {
        id
      }
    }
    score_timeline {
      event_time
      score
    }
    scoreboard {
      score
      rank
    }
  }
`;

type TeamParams = {
  id: string;
};

export default function Team() {
  let { id }: TeamParams = useParams();
  const { data } = GQLHooks.Fragments.SingleTeam.useQueryById({
    teamsId: parseInt(id),
  });
  const t = data?.teams_by_pk;

  return (
    <>
      <Display2>
        {t?.name} {/* todo flag icon */}
        {t?.country ? t?.country : null}
      </Display2>
      <Display4>{t?.scoreboard?.rank} Place</Display4>
      <Display4>{t?.scoreboard?.score} Points</Display4>
      <H1>Members</H1>
      <Block display={"flex"} flexWrap={true}>
        {t?.members.map((u) => (
          <TeamMember user={u} />
        ))}
      </Block>
      <H1>Score</H1>
      <TimelineContainer>
        <TeamTimeline timeline={t} />
      </TimelineContainer>
    </>
  );
}
