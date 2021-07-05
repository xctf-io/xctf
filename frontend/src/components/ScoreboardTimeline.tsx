import { ScoreboardTimelineQuery } from "../generated";
import {
  FlexibleXYPlot,
  HorizontalGridLines,
  LineSeries,
  LineSeriesPoint,
  XAxis,
  YAxis,
} from "react-vis";
import "../../node_modules/react-vis/dist/style.css";

type ScoreboardTimelineProps = {
  scoreboard?: ScoreboardTimelineQuery["scoreboard"];
};

export default function ScoreboardTimeline({
  scoreboard,
}: ScoreboardTimelineProps) {
  return (
    <FlexibleXYPlot xType={"time"}>
      <XAxis />
      <YAxis />
      <HorizontalGridLines />
      {scoreboard?.map((team) => (
        <LineSeries
          key={team.team?.id}
          data={team.team?.score_timeline.map((st) => ({
            x: new Date(st.event_time).getTime(),
            y: st.score,
          }))}
        />
      ))}
    </FlexibleXYPlot>
  );
}
