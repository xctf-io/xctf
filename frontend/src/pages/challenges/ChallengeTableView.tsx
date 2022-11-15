import React, { useEffect, useState } from "react";
import { ChallengeListFragment } from "../../generated";
import { useStyletron } from "baseui";
import { TableBuilder, TableBuilderColumn, TableOverrides } from "baseui/table-semantic";
import { Button } from "baseui/button";
import { ChallengeModal } from "./ChallengeModal";

interface RowDataT {
  id: string;
  tag: string;
  challengeName: string;
  challengeDescription: string;
  challengeValue: number;
  challengeSolved: boolean;
}

interface ChallengeTableViewProps {
  challengeTags?: ChallengeListFragment[];
}

export const ChallengeTableView: React.FC<ChallengeTableViewProps> = ({ challengeTags }) => {
  const [css] = useStyletron();
  const [rows, setRows] = useState<RowDataT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openedChallenge, setOpenedChallenge] = useState<string>("");

  useEffect(() => {
    if (!challengeTags) {
      return;
    }

    const dataTableRows: RowDataT[] = challengeTags.map(challengeTag => ({
      id: challengeTag.challenge?.id || "",
      tag: challengeTag.tag?.name || "",
      challengeName: challengeTag.challenge?.name || "",
      challengeDescription: challengeTag.challenge?.description || "",
      challengeValue: challengeTag.challenge?.value || 0,
      challengeSolved: !!challengeTag.challenge?.solved,
    }));
    setRows(dataTableRows);
    setIsLoading(false);
  }, [challengeTags]);

  const overrides: TableOverrides = {
    TableBodyCell: {
      style: {
        verticalAlign: "center",
      },
    },
  };

  const challengeModals = rows.map(row => (
    <ChallengeModal challenge={{
      id: row.id,
      name: row.challengeName,
      description: row.challengeDescription,
      value: row.challengeValue,
    }} isOpen={openedChallenge === row.id} close={() => setOpenedChallenge("")} />
  ));

  return (
    <>
      <TableBuilder
        data={rows}
        // sortColumn={sortColumn}
        // sortOrder={sortAsc ? "ASC" : "DESC"}
        // onSort={handleSort}
        overrides={overrides}
      >
        <TableBuilderColumn id="bar" header="Category" sortable>
          {(row: RowDataT) => row.tag}
        </TableBuilderColumn>
        <TableBuilderColumn
          header="Name"
        >
          {(row: RowDataT) => row.challengeName}
        </TableBuilderColumn>
        <TableBuilderColumn
          header="Value"
        >
          {(row: RowDataT) => row.challengeValue}
        </TableBuilderColumn>
        <TableBuilderColumn
          header=""
        >
          {(row: RowDataT) => (
            <>
              <Button onClick={() => setOpenedChallenge(row.id)}>Solve</Button>
            </>
          )}
        </TableBuilderColumn>
      </TableBuilder>
      {challengeModals}
    </>
  );
};
