import { gql } from "@apollo/client";
import { useTeamCaptainFormLazyQuery } from "generated";
import { useAuthContext } from "context/AuthContext";
import { useEffect } from "react";




export function TestFragment() {
  const authContext = useAuthContext();
  const [loadTeamForm, { data, loading, error, called }] =
    useTeamCaptainFormLazyQuery({
      variables: {
        id: authContext?.current_user?.id,
      },
    });
  useEffect(() => {
    if (authContext?.current_user?.captain_of?.id) loadTeamForm();
  }, [authContext, loadTeamForm]);
  return <p>{JSON.stringify(data)}</p>;
}
