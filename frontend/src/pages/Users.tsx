import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";
import { usePublicAccessCheck } from "../util/auth";

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
  usePublicAccessCheck("account_visibility");
  const { data } = GQLHooks.Fragments.UserList.useQueryObjects({
    variables: { limit: 10 },
  });
  return <p>{JSON.stringify(data)}</p>;
}
