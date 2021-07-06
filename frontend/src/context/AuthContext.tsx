import { gql } from "@apollo/client";
import {
  AuthContextDocument,
  AuthContextQuery,
  useAuthContextQuery,
} from "generated";
import React from "react";

gql`
  query AuthContext {
    current_user {
      id
      name
      created
      country
      affiliation
      bracket
      website
      verified
      type
      avatar
      captain_of {
        id
      }
      team {
        id
        name
        created
        country
        affiliation
        bracket
        website
      }
    }
    config(
      where: {
        key: {
          _in: [
            "challenge_visibility"
            "registration_visibility"
            "score_visibility"
            "account_visibility"
            "ctf_name"
          ]
        }
      }
    ) {
      key
      value
    }
  }
`;

const massageConfig = (res: AuthContextQuery["config"]) => {
  let acc: { [key: string]: string } = {};
  return res.reduce((acc, ci) => {
    return {
      ...acc,
      [ci.key || ""]: ci.value || "",
    };
  }, acc);
};

type AuthContextType = {
  loading: boolean;
  current_user?: AuthContextQuery["current_user"][0];
  config: { [key: string]: string };
};

export const AuthContext = React.createContext<AuthContextType>({
  loading: true,
  config: {},
});

export function useAuthContext() {
  return React.useContext(AuthContext);
}

type ChildrenProps = {
  children?: React.ReactNode;
};

export function AuthContextProvider({ children }: ChildrenProps) {
  const { data, loading, error } = useAuthContextQuery();

  if (loading || error) {
    return <>{children}</>;
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        current_user: data?.current_user[0],
        config: data?.config ? massageConfig(data.config) : {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
