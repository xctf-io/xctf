import React, { useEffect, useState } from "react";
import { NumericalColumn, Row, RowAction, StatefulDataTable, StringColumn } from "baseui/data-table";
import { GQLHooks } from "../../../generated/hasura/react";
import { AdminChallengeFragment, Order_By } from "../../../generated";
import { Check } from "baseui/icon";
import { Challenge, ChallengeModal } from "./ChallengeModal";

type ColumnRow = AdminChallengeFragment;

const columns = [
  StringColumn({
    title: "Name",
    mapDataToValue: (data: ColumnRow) => data.name || "",
  }),
  NumericalColumn({
    title: "Value",
    mapDataToValue: (data: ColumnRow) => data.value || -1,
  }),
  StringColumn({
    title: "Tags",
    mapDataToValue: (data: ColumnRow) => data.tags.map(t => t.tag?.name).join(", ") || "",
  }),
];
export default function Challenges() {
  const [chalModalOpen, setChalModalOpen] = useState(false);
  const [editedChallenge, setEditedChallenge] = useState<Challenge | undefined>(undefined);

  const [rows, setRows] = useState<Row[]>([]);
  const { data } = GQLHooks.Fragments.AdminChallenge.useQueryObjects({
    variables: {
      limit: 100,
      order_by: {
        name: Order_By.Desc,
      },
    },
  });

  useEffect(() => {
    if (data === undefined || rows.length) {
      return;
    }
    const newRows: Row[] = data.challenge.map(c => {
      return {
        id: c.id || "",
        data: c || {},
      };
    });
    setRows(newRows);
  }, [rows, data]);

  const editRow = (id: string | number) => {
    const challengesToEdit = data?.challenge.filter(c => c.id === id);
    if (challengesToEdit && challengesToEdit.length === 0) {
      return;
    }
    if (challengesToEdit === undefined) {
      return;
    }
    const challengeToEdit = challengesToEdit[0];

    setEditedChallenge(challengeToEdit);
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
