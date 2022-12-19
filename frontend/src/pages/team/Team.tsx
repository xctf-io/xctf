import { Block } from "baseui/block";
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
      <p>
        {t?.name} {/* todo flag icon */}
        {t?.country ? t?.country : null}
      </p>
      <p>{t?.scoreboard?.rank} Place</p>
      <p>{t?.scoreboard?.score} Points</p>
      <h1>Members</h1>
      <Block display={"flex"} flexWrap={true}>
        {t?.members.map((u) => (
          <TeamMember user={u} />
        ))}
      </Block>
      <h1>Score</h1>
      <TimelineContainer>
        <TeamTimeline timeline={t} />
      </TimelineContainer>
    </>
  );
}
