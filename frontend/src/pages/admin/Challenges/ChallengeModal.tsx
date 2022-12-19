import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, ROLE, SIZE } from "baseui/modal";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { GQLHooks } from "../../../generated/hasura/react";

export interface Challenge {
  name?: string | null;
}

const defaultChallenge: Challenge = {
  // __typename: "challenge",
  // comments: [],
  // comments_aggregate: { nodes: [] },
  // connection_info: undefined,
  // description: undefined,
  // files: [],
  // files_aggregate: { nodes: [] },
  // flags: [],
  // flags_aggregate: { nodes: [] },
  // hints: [],
  // hints_aggregate: { nodes: [] },
  // id: undefined,
  // max_attempts: undefined,
  name: undefined,
  // next_id: undefined,
  // requirements: undefined,
  // solved: undefined,
  // solves: [],
  // solves_aggregate: { nodes: [] },
  // state: "",
  // submissions: [],
  // submissions_aggregate: { nodes: [] },
  // tags: [],
  // tags_aggregate: { nodes: [] },
  // type: undefined,
  // value: undefined,
};

interface ChallengeModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  challenge?: Challenge;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, setIsOpen, challenge }) => {
  const [modalChallenge, setModalChallenge] = useState<Challenge>(challenge || defaultChallenge);

  const inputChangeHandler = (propertyName: keyof Challenge): (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void => {
    return (e) => {
      setModalChallenge({
        ...modalChallenge,
        [propertyName]: e.target.value,
      });
      console.log(modalChallenge);
    };
  };

  const [insert] = GQLHooks.Fragments.ChallengeForAdminList.useInsert();

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>
        Edit Challenge
      </ModalHeader>
      <ModalBody>
        <FormControl
          label={() => "name"}
        >
          <Input onChange={inputChangeHandler("name")} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={() => setIsOpen(false)}>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
