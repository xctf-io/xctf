import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";
import { useParams } from "react-router-dom";
import { Display2, Display4, H1 } from "baseui/typography";
import { Block } from "baseui/block";
import { TeamMember } from "../components/TeamMember";
import {
  FlexibleXYPlot,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  YAxis,
} from "react-vis";
import "../../node_modules/react-vis/dist/style.css";
import React, { Suspense } from "react";
import { StyledSpinnerNext } from "baseui/spinner";

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
      score
    }
    score_timeline {
      event_time
      score
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
      <Display4>nth Place</Display4>
      <Display4>{t?.score_timeline?.slice(-1)[0]?.score} Points</Display4>
      <H1>Members</H1>
      <Block display={"flex"} flexWrap={true}>
        {t?.members.map((u) => (
          <TeamMember user={u} />
        ))}
      </Block>
      <H1>Score</H1>
      <Block
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"25vh"}
        minHeight={"200px"}
      >
        <Suspense fallback={<StyledSpinnerNext />}>
          <FlexibleXYPlot xType={"time"}>
            <XAxis />
            <YAxis />
            <HorizontalGridLines />
            <LineSeries
              data={t?.score_timeline.map((st) => ({
                x: new Date(st.event_time || 0).getTime(),
                y: st.score,
              }))}
            />
          </FlexibleXYPlot>
        </Suspense>
      </Block>
    </>
  );
}
