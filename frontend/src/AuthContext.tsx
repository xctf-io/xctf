import {gql} from "@apollo/client";
import {AuthContextQuery, useAuthContextQuery} from "./generated/graphql";
import React from "react";

const QUERY = gql`
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
    }

`;

const AuthContext = React.createContext<AuthContextQuery|undefined>(undefined);

type AuthContextProviderProps = {
    children?: React.ReactNode;
}

export function AuthContextProvider({children} : AuthContextProviderProps) {
    const { data, loading, error } = useAuthContextQuery();

    if (loading || error) {
        console.log(error);
        return <>{children}</>;
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}