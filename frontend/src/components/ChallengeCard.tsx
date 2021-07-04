import { Card, StyledAction, StyledBody } from "baseui/card";
import { KIND, Tag, VARIANT } from "baseui/tag";
import { Icon } from "baseui/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Button } from "baseui/button";
import { Challenges as ChallengesType } from "../generated";

type ChallengeCardProps = {
  challenge: RecursivePartial<ChallengesType>;
};

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card
      title={
        <>
          {challenge.name}{" "}
          <Tag closeable={false} kind={KIND.positive} variant={VARIANT.solid}>
            <Icon>
              <FontAwesomeIcon icon={faTrophy} />
            </Icon>{" "}
            {challenge.value}
          </Tag>
        </>
      }
    >
      <StyledBody>
        {challenge.category} {challenge.solved}
      </StyledBody>
      <StyledAction>
        <Button overrides={{ BaseButton: { style: { width: "100%" } } }}>
          Button Label
        </Button>
      </StyledAction>
    </Card>
  );
}
