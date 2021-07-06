import { ReactNode } from "react";
import { SIZE, Table } from "baseui/table-semantic";
import { ScoreboardQuery } from "../generated";
import { Link } from "react-router-dom";

type ScoreboardTableProps = {
  scoreboard?: ScoreboardQuery["scoreboard"];
};

export default function ScoreboardTable({ scoreboard }: ScoreboardTableProps) {
  const generateScoreboard = () => {
    const result: Array<Array<ReactNode>> = [];
    scoreboard?.map((item, idx) =>
      result.push([
        idx + 1,
        <Link to={"/team/" + item?.team?.id}>{item?.team?.name}</Link>,
        item?.team?.score_timeline?.slice(-1)[0]?.score,
        item?.team?.id,
      ]),
    );
    return result;
  };
  return (
    <Table
      columns={["Place", "Team", "Score"]}
      data={generateScoreboard()}
      size={SIZE.spacious}
    />
  );
}
