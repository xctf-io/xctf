import React, { useEffect, useState } from "react";
import { Row, RowAction, StatefulDataTable, StringColumn } from "baseui/data-table";
import { GQLHooks } from "../../../generated/hasura/react";
import { Order_By } from "../../../generated";
import { Check } from "baseui/icon";
import { Challenge, ChallengeModal } from "./ChallengeModal";

const columns = [
  StringColumn({
    title: "Name",
    mapDataToValue: (data: any) => data.name,
  }),
];
export default function Challenges() {
  const [chalModalOpen, setChalModalOpen] = useState(false);
  const [editedChallenge, setEditedChallenge] = useState<Challenge | undefined>(undefined);

  const [rows, setRows] = useState<Row[]>([]);
  const { data } = GQLHooks.Fragments.ChallengeForAdminList.useQueryObjects({
    variables: {
      limit: 100,
      order_by: {
        challenge: {
          name: Order_By.Desc,
        },
      },
    },
  });

  useEffect(() => {
    if (data === undefined || rows.length) {
      return;
    }
    const newRows: Row[] = data.challenge_tag.map(c => {
      return {
        id: c.challenge?.id || "",
        data: c.challenge || {},
      };
    });
    setRows(newRows);
  }, [rows, data]);

  const editRow = (id: string | number) => {
    const challengesToEdit = data?.challenge_tag.filter(c => c.challenge?.id === id);
    if (challengesToEdit && challengesToEdit.length === 0) {
      return;
    }
    if (challengesToEdit === undefined) {
      return;
    }
    const challengeToEdit = challengesToEdit[0];

    setEditedChallenge({
      name: challengeToEdit.challenge?.name,
    });
    setChalModalOpen(true);
  };

  const rowActions: RowAction[] = [
    {
      label: "Check",
      onClick: ({ row }) => editRow(row.id),
      renderIcon: Check,
    },
  ];

  return (
    <div style={{ height: "800px" }}>
      <StatefulDataTable
        columns={columns}
        rows={rows}
        rowActions={rowActions}
      />
      <ChallengeModal isOpen={chalModalOpen} setIsOpen={setChalModalOpen} challenge={editedChallenge} />
    </div>
  );
}
