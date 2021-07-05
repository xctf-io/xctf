import {
  FlexibleXYPlot,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  YAxis,
} from "react-vis";
import React from "react";
import { SingleTeamFragment } from "../generated";

type TeamTimelineProps = {
  timeline?: SingleTeamFragment["score_timeline"];
};

export default function TeamTimeline({ timeline }: TeamTimelineProps) {
  return (
    <FlexibleXYPlot xType={"time"}>
      <XAxis />
      <YAxis />
      <HorizontalGridLines />
      <LineSeries
        data={timeline?.map((ti) => ({
          x: new Date(ti.event_time || 0).getTime(),
          y: ti.score,
        }))}
      />
    </FlexibleXYPlot>
  );
}
