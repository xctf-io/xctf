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
  scoreboard?: ScoreboardTimelineQuery["score_timeline"];
};

export default function ScoreboardTimeline({
  scoreboard,
}: ScoreboardTimelineProps) {
  const generateScoreboardTimeline = () => {
    const result: { [key: string]: Array<LineSeriesPoint> } = {};

    scoreboard?.map((item, idx) => {
      const timestampUTC: number = new Date(item?.event_time || 0).getTime();
      if (!result[item?.team_id || ""]) {
        result[item?.team_id || ""] = [
          { x: timestampUTC || 0, y: item?.score },
        ];
      } else {
        result[item?.team_id || ""].push({
          x: timestampUTC || 0,
          y: item?.score,
        });
      }
      return null;
    });
    return result;
  };

  const timelineData = generateScoreboardTimeline();

  return (
    <FlexibleXYPlot xType={"time"}>
      <XAxis />
      <YAxis />
      <HorizontalGridLines />
      {Object.keys(timelineData).map((team) => (
        <LineSeries
          key={team}
          data={timelineData[team]}
        />
      ))}
    </FlexibleXYPlot>
  );
}
