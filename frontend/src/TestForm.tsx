import { gql } from "@apollo/client";
import { useTeamCaptainFormLazyQuery } from "./generated/graphql";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

const FORM_QUERY = gql`
    query TeamCaptainForm($id: Int = 0) {
        teams_by_pk(id: $id) {
            affiliation
            bracket
            captain {
                id
            }
            country
            email
            name
            website
        }
    }
`;

/*
const schemaExtras = {
  id: {
    allowedValues: [1, 2, 3],
  },
  title: {
    options: [
      { label: 1, value: "a" },
      { label: 2, value: "b" },
    ],
  },
  "author.firstName": {
    placeholder: "John",
  },
};

const schemaValidator = (model: object) => {
  const details = [];


  // ...

  return details.length ? { details } : null;
};

const bridge = new GraphQLBridge(
  TeamCaptainFormDocument.getType('teams'),
  schemaValidator,
  schemaExtras,
);

 */

export function TestForm() {
  const authContext = useAuthContext();
  const [loadTeamForm, { data, loading, error, called }] = useTeamCaptainFormLazyQuery({
    variables: {
      id: authContext?.id,
    },
  });
  useEffect(() => {
    if (authContext?.captain_of?.id) loadTeamForm();
  }, [authContext, loadTeamForm]);
  return <p>{JSON.stringify(data)}</p>;
}
