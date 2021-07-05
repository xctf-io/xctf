import { ReactNode } from "react";
import { SIZE, Table } from "baseui/table-semantic";
import { ScoreboardQuery } from "../generated";

type ScoreboardTableProps = {
  scoreboard?: ScoreboardQuery["scoreboard"];
};

export function ScoreboardTable({ scoreboard }: ScoreboardTableProps) {
  const generateScoreboard = () => {
    const result: Array<Array<ReactNode>> = [];
    scoreboard?.map((item, idx) => {
      result.push([idx + 1, item?.team?.name, item?.score, item?.team?.id]);
    });
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
