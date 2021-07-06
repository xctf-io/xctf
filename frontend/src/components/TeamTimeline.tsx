import {
  FlexibleXYPlot,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  YAxis,
} from "react-vis";
import React from "react";
import { Maybe, TeamTimelineFragment } from "../generated";
import { gql } from "@apollo/client";
gql`
  fragment TeamTimeline on teams {
    score_timeline {
      event_time
      score
    }
  }
`;
type TeamTimelineProps = {
  timeline?: Maybe<TeamTimelineFragment>;
};

export default function TeamTimeline({ timeline }: TeamTimelineProps) {
  return (
    <FlexibleXYPlot xType={"time"}>
      <XAxis />
      <YAxis />
      <HorizontalGridLines />
      <LineSeries
        data={timeline?.score_timeline?.map((ti) => ({
          x: new Date(ti.event_time || 0).getTime(),
          y: ti.score,
        }))}
      />
    </FlexibleXYPlot>
  );
}
