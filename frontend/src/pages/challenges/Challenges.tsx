import { Grid } from "baseui/layout-grid";
import ChallengeCard from "../../components/ChallengeCard";
import { Order_By } from "../../generated";
import { GQLHooks } from "../../generated/hasura/react";

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
