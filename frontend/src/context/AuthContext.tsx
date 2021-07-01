import {gql} from "@apollo/client";
import {AuthContextQuery, useAuthContextQuery} from "../generated/graphql";
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

export const AuthContext = React.createContext<AuthContextQuery["current_user"][0]|undefined>(undefined);

type ChildrenProps = {
    children?: React.ReactNode;
}

export function useAuthContext() {
    return React.useContext(AuthContext)
}

export function AuthContextWrapper({children} : ChildrenProps) {
    const { data, loading, error } = useAuthContextQuery();

    if (loading || error) {
        console.log(error);
        return <>{children}</>;
    }

    return <AuthContext.Provider value={data?.current_user[0]}>{children}</AuthContext.Provider>;
}