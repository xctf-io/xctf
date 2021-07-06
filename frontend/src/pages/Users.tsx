import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";
import UsersTable from "../components/UsersTable";

gql`
  fragment UserList on users {
    id
    name
    website
    affiliation
    country
  }
`;

export default function Users() {
  const { data } = GQLHooks.Fragments.UserList.useQueryObjects({
    variables: { limit: 10 },
  });

  return <UsersTable users={[...data?.users]}> </UsersTable>;
}
