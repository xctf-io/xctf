import { gql } from "@apollo/client";
import { Maybe, UserListFragment } from "../../generated";
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
  users?: Maybe<UserListFragment[]>;
};

export default function UsersTable({ users }: UsersTableProps) {
  const columns = [
    "Name",
    "Website",
    "Affiliation",
    "Country",
  ];

  if (!users) return <p>loading</p>;

  return (
    <div>
      <Table
        columns={columns}
        data={users.map((item) => ([item?.name, item?.website, item?.affiliation, item?.country]))}
        size={"spacious"}
      />
    </div>
  );
}
