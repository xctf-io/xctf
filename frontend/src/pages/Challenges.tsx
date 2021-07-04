import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";
import { Card, StyledAction, StyledBody } from "baseui/card";
import { Button } from "baseui/button";
import { KIND, Tag, VARIANT } from "baseui/tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "baseui/icon";
import { Grid } from "baseui/layout-grid";
import { Order_By } from "../generated";

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
      {data?.challenges.map((chal) => (
        <Card
          title={
            <>
              {chal.name}{" "}
              <Tag
                closeable={false}
                kind={KIND.positive}
                variant={VARIANT.solid}
              >
                <Icon>
                  <FontAwesomeIcon icon={faTrophy} />
                </Icon>{" "}
                {chal.value}
              </Tag>
            </>
          }
        >
          <StyledBody>{chal.category}</StyledBody>
          <StyledAction>
            <Button overrides={{ BaseButton: { style: { width: "100%" } } }}>
              Button Label
            </Button>
          </StyledAction>
        </Card>
      ))}
    </Grid>
  );
}
