import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";

gql`
  fragment ChallengeList on challenges {
    id
    name
    category
    description
    value
    max_attempts
    files {
      id
      location
      type
    }
    hints {
      id
      type
      cost
      unlocked_content {
        id
        content
      }
    }
    tags {
      id
      value
    }
    type
  }
`;

export default function Challenges() {
  const { data } = GQLHooks.Fragments.ChallengeList.useQueryObjects({
    variables: { limit: 10 },
  });
  return <p>{JSON.stringify(data)}</p>;
}
