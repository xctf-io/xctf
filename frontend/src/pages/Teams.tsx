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
  const { data } = GQLHooks.Fragments.TeamList.useQueryObjects({
    variables: { limit: 10 },
  });
  return <p>{JSON.stringify(data)}</p>;
}
