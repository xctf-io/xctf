import { ReactNode } from "react";
import { Maybe, UserListFragment } from "../generated";
import {
  StatefulDataTable,
  NumericalColumn,
  StringColumn,
} from "baseui/data-table";
import { useStyletron } from "baseui";
import { gql } from "@apollo/client";

gql`
  fragment UserTable on users {
    id
    name
    website
    affiliation
    country
  }
`;

type UsersTableProps = {
  users?: Maybe<UserListFragment[]>;
};

export default function UsersTable({ users }: UsersTableProps) {
  type rowData = [number, string, string, string, string];

  const columns = [
    StringColumn({
      title: "Name",
      mapDataToValue: (data: rowData) => data[0],
    }),
    StringColumn({
      title: "Website",
      mapDataToValue: (data: rowData) => data[1],
    }),
    StringColumn({
      title: "Affiliation",
      mapDataToValue: (data: rowData) => data[2],
    }),
    StringColumn({
      title: "Country",
      mapDataToValue: (data: rowData) => data[3],
    }),
  ];

  const [css] = useStyletron();

  if (!users) return <p>loading</p>;

  return (
    <div className={css({ height: "800px" })}>
      <StatefulDataTable
        filterable={false}
        searchable={false}
        columns={columns}
        rows={users.map((item, idx) => ({
          id: item?.id,
          data: [item?.name, item?.website, item?.affiliation, item?.country],
        }))}
      />
    </div>
  );
}
