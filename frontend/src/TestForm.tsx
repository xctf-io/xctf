import { gql } from "@apollo/client";
import { useAuthContext } from "context/AuthContext";
import { useEffect } from "react";
import { GQLHooks } from "./generated/hasura/react";

gql`
    fragment TeamAsCaptain on teams {
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
`;

export function MyTeam() {
  const authContext = useAuthContext();
  const [loadTeamForm, { data }] = GQLHooks.Fragments.TeamAsCaptain.useQueryByIdLazy(
    { teamsId: authContext.current_user?.captain_of?.id || 0 }
  );

  useEffect(() => {
    if (authContext?.current_user?.captain_of?.id) loadTeamForm({});
  }, [authContext, loadTeamForm]);

  return <p>{JSON.stringify(data)}</p>;
}
