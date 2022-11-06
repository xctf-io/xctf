import { gql } from "@apollo/client";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Panel } from "baseui/accordion";
import { Button } from "baseui/button";
import { Card, StyledBody } from "baseui/card";
import { Icon } from "baseui/icon";
import { Input } from "baseui/input";
import { KIND, Tag, VARIANT } from "baseui/tag";
import { useState } from "react";
import {
  Challenges as ChallengesType,
} from "../generated";

type ChallengeCardProps = {
  challenge: RecursivePartial<ChallengesType>;
};

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [value, setValue] = useState("" as string);

  const handleSubmit = () => {
    let parameters: any = {
      variables: { provided: value || "", challenge_id: challenge.id || -1 },
    };
    console.log(parameters);
  };

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
      overrides={{
        Contents: {
          style: ({ $theme }) => ({
            outline: `${$theme.colors.green300} solid`,
            backgroundColor: $theme.colors.gray50,
          }),
        },
      }}
    >
      <StyledBody>
        {challenge.category} {challenge.solved}
        <Accordion>
          <Panel title={"Solve"}>
            <Input
              value={value}
              onChange={(e) => {
                let element = e.target as HTMLInputElement;
                setValue(element.value);
              }}
              placeholder="Flag"
              clearOnEscape
            ></Input>
            <Button
              overrides={{
                BaseButton: { style: { width: "100%", marginTop: "8px" } },
              }}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Panel>
        </Accordion>
      </StyledBody>
    </Card>
  );
}
