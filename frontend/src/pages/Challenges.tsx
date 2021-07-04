import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Tag, KIND, VARIANT } from "baseui/tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "baseui/icon";
import { Grid } from "baseui/layout-grid";

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
                </Icon>
                {chal.value}
              </Tag>
            </>
          }
        >
          <StyledBody></StyledBody>
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
