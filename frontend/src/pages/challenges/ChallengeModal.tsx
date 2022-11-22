import * as React from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ROLE, SIZE } from "baseui/modal";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";

export interface ChallengeModalChallenge {
  id: string;
  name: string;
  value: number;
  description: string;
}

interface ChallengeModalProps {
  challenge: ChallengeModalChallenge;
  isOpen: boolean;
  close: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({ challenge, isOpen, close }) => {
  const [css, theme] = useStyletron();
  const [flag, setFlag] = useState<string | null>(null);
  const handleSubmit = () => {
    
  };

  return (
    <Modal
      onClose={() => close()}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>{challenge.name}</ModalHeader>
      <ModalBody>{challenge.description}</ModalBody>
      <ModalFooter>
        <div className={css({ display: "flex" })}>
          <Input
            value={flag || ""}
            onChange={(e) => {
              let element = e.target as HTMLInputElement;
              setFlag(element.value);
            }}
            placeholder="Flag"
            clearOnEscape
            overrides={{
              Root: {
                style: {
                  width: "75%",
                  marginRight: theme.sizing.scale400,
                },
              },
            }}
          ></Input>
          <Button
            onClick={() => handleSubmit()}
            overrides={{
              Root: {
                style: {
                  width: "25%",
                  marginRight: theme.sizing.scale400,
                },
              },
            }}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>

    </Modal>
  );
};