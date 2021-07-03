import { usePublicAccessCheck } from "../util/auth";
import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";

gql`
    fragment TeamList on teams {
        id
        name
        website
        affiliation
        country
    }
`;

export default function Teams() {
  usePublicAccessCheck("account_visibility");
  const { data } = GQLHooks.Fragments.TeamList.useQueryObjects({
    variables: { limit: 10 },
  });
  return <p>{JSON.stringify(data)}</p>;
}
