import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";
import { Grid } from "baseui/layout-grid";
import { Order_By } from "../generated";
import { ChallengeCard } from "../components/ChallengeCard";

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
    variables: {
      limit: 100,
      order_by: {
        category: Order_By.Asc,
        value: Order_By.Desc,
        name: Order_By.Asc,
      },
    },
  });
  return (
    <Grid>
      {data?.challenges.map((c) => (
        <ChallengeCard challenge={c} />
      ))}
    </Grid>
  );
}
