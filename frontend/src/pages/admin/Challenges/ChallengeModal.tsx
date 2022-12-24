import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, ROLE, SIZE } from "baseui/modal";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { GQLHooks } from "../../../generated/hasura/react";
import {
  Challenge_Constraint,
  Challenge_Insert_Input,
  Challenge_Update_Column,
  Maybe,
  Scalars,
} from "../../../generated";

export interface Challenge {
  id: string;
  name?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["Int"]>;
  connection_info?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  max_attempts?: Maybe<Scalars["Int"]>;
  next_id?: Maybe<Scalars["uuid"]>;
  requirements?: Maybe<Scalars["json"]>;
  state?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  /*
  comments?: Maybe<Comment_Arr_Rel_Insert_Input>;
  files?: Maybe<File_Arr_Rel_Insert_Input>;
  flags?: Maybe<Flag_Arr_Rel_Insert_Input>;
  hints?: Maybe<Hint_Arr_Rel_Insert_Input>;
  solves?: Maybe<Solve_Arr_Rel_Insert_Input>;
  submissions?: Maybe<Submission_Arr_Rel_Insert_Input>;
  tags?: Maybe<Challenge_Tag_Arr_Rel_Insert_Input>;
   */
}

interface ChallengeModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  challenge?: Challenge;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, setIsOpen, challenge }) => {
  const [modalChallenge, setModalChallenge] = useState<Challenge | undefined>(undefined);

  useEffect(() => {
    setModalChallenge(challenge);
  }, [challenge]);

  const [insert, result] = GQLHooks.Fragments.AdminChallenge.useInsertWithOnConflict({});

  const inputChangeHandler = (propertyName: keyof Challenge): (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void => {
    return async (e) => {
      if (!modalChallenge) {
        return;
      }

      const newChallenge: Challenge = {
        ...modalChallenge,
        [propertyName]: e.target.value,
      };

      setModalChallenge(newChallenge);

      const challengeInput: Challenge_Insert_Input = {
        ...newChallenge,

        // TODO (cthompson) need to figure out the types for this. if these aren't present the gql query doesnt work.
        tags: {
          data: [],
        },
        files: {
          data: [],
        },
        hints: {
          data: [],
        },
      };

      await insert({
        challenge: challengeInput,
        onConflict: {
          constraint: Challenge_Constraint.ChallengePkey,
          update_columns: [Challenge_Update_Column.Id, Challenge_Update_Column.Name, Challenge_Update_Column.Value],
        },
      });
    };
  };

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
          <Input value={modalChallenge?.name || ""} onChange={inputChangeHandler("name")} />
        </FormControl>
        <FormControl
          label={() => "value"}
        >
          <Input value={modalChallenge?.value || ""} onChange={inputChangeHandler("value")} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={() => setIsOpen(false)}>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
