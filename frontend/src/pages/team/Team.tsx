import { Block } from "baseui/block";
import { Display2, Display4, H1 } from "baseui/typography";
import React, { lazy } from "react";
import { useParams } from "react-router-dom";
import "react-vis/dist/style.css";
import { TeamMember } from "../teams/TeamMember";
import { TimelineContainer } from "../teams/TimelineContainer";
import { GQLHooks } from "../../generated/hasura/react";

const TeamTimeline = lazy(() => import("../teams/TeamTimeline"));

type TeamParams = {
  id: string;
};

export default function Team() {
  let { id }: TeamParams = useParams();
  const { data, loading } = GQLHooks.Fragments.SingleTeam.useQueryById({
    teamId: id,
  });
  const t = data?.team_by_pk;

  if (loading) {
    return (
      <>
        <p>Loading...</p>
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
