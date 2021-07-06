import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";
import { useParams } from "react-router-dom";
import { Display2, Display4, H1 } from "baseui/typography";
import { Block } from "baseui/block";
import { TeamMember } from "../components/TeamMember";
import "../../node_modules/react-vis/dist/style.css";
import React, { lazy } from "react";
import { TimelineContainer } from "../components/TimelineContainer";
import { Skeleton } from "baseui/skeleton";

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
  const { data, loading } = GQLHooks.Fragments.SingleTeam.useQueryById({
    teamsId: parseInt(id),
  });
  const t = data?.teams_by_pk;

  if (loading) {
    return (
      <>
        <Skeleton height={"64px"} width={"400px"} animation />
        <Skeleton height={"44px"} width={"300px"} animation/>
        <Skeleton height={"44px"} width={"280px"} animation/>
        <Block marginTop={"0.67em"} marginBottom={"0.67em"}>
          <Skeleton height={"64px"} width={"150px"} animation />
        </Block>
        <Block display={"flex"}>
          {Array.from(Array(5).keys()).map(() => (
            <>
              <Skeleton height={"120px"} width={"112px"} animation />
              <Block width={"12px"} />
            </>
          ))}
        </Block>
        <Block marginTop={"0.67em"} marginBottom={"0.67em"}>
          <Skeleton height={"64px"} width={"150px"} animation />
        </Block>
        <TimelineContainer>
          <Skeleton height={"100%"} width={"100%"} animation />
        </TimelineContainer>
      </>
    );
  }
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
