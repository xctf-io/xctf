import { gql } from "@apollo/client";
import { Maybe, TeamListFragment } from "../../generated";
import { Table } from "baseui/table-semantic";

gql`
    fragment UserTable on user {
        id
        name
        website
        affiliation
        country
    }
`;

type UsersTableProps = {
  teams?: Maybe<TeamListFragment[]>;
};

export default function TeamsTable({ teams }: UsersTableProps) {
  const columns = [
    "Name",
    "Website",
    "Affiliation",
    "Country",
  ];

  if (!teams) return <p>loading</p>;

  return (
    <div>
      <Table
        columns={columns}
        data={teams.map((item) => ([item?.name, item?.website, item?.affiliation, item?.country]))}
        size={"spacious"}
      />
    </div>
  );
}
