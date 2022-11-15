import { Order_By } from "../../generated";
import { GQLHooks } from "../../generated/hasura/react";
import { useStyletron } from "baseui";
import { ChallengeTableView } from "./ChallengeTableView";

export default function Challenges() {
  const [css] = useStyletron();

  const { data } = GQLHooks.Fragments.ChallengeList.useQueryObjects({
    variables: {
      limit: 100,
      order_by: {
        challenge: {
          name: Order_By.Desc,
        },
      },
    },
  });

  return (
    <>
      <ChallengeTableView challengeTags={data?.challenge_tag} />
    </>
  );
}
