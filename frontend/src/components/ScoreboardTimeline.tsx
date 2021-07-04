
import {
  ScoreboardTimelineQuery,
} from "../generated";
import {
  XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, LineSeriesProps, LineSeriesPoint,
} from "react-vis";

type ScoreboardTimelineProps = {
  scoreboard?: ScoreboardTimelineQuery["score_timeline"]
}

export function ScoreboardTimeline({ scoreboard }: ScoreboardTimelineProps) {
  const generateScoreboardTimeline = () => {
    const result: {[key: string]: Array<LineSeriesPoint>}= {};

    scoreboard?.map((item, idx) => {

      const timestampUTC: number = new Date(item?.event_time || 0).getTime()
      if(!result[item?.team_id || ""]) {
        result[item?.team_id || ""] = [{x: timestampUTC || 0, y: item?.score}]
      } else {
        result[item?.team_id || ""].push({x: timestampUTC || 0, y: item?.score})
      }
    });
    return result;
  };

  const timelineData = generateScoreboardTimeline()

  console.log(timelineData);

  return (
    <>

      <XYPlot
        width={1200}
        height={600}
      >
        <XAxis
          attr="x"
          attrAxis="y"
          orientation="bottom"
          tickFormat={function tickFormat(d){return new Date(d).toLocaleDateString()}}
          tickLabelAngle={0}
        />
        <HorizontalGridLines />
        {Object.keys(timelineData).map((team) => (
          <LineSeries
            curve={undefined}
            key={team}
            data={timelineData[team]}
            opacity={1}
            strokeStyle="solid"
          >
          </LineSeries>
        ))}

      </XYPlot>
    </>


  );
}