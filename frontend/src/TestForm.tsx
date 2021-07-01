import { gql } from "@apollo/client";
import GraphQLBridge from "uniforms-bridge-graphql";
import { TeamCaptainFormDocument, useTeamCaptainFormQuery } from "./generated/graphql";
import { buildASTSchema, parse } from "graphql";
import { useAuthContext } from "./context/AuthContext";

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
  TeamCaptainFormDocument.getType('Team'),
  schemaValidator,
  schemaExtras,
);

 */

export function TestForm() {
  const authContext = useAuthContext();
  const {data, loading, error} = useTeamCaptainFormQuery({
    variables: {
      id: authContext?.id
    }
  })
  return <p>{JSON.stringify(data)}</p>;
}
