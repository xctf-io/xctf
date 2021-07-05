import { gql } from "@apollo/client";
import { GQLHooks } from "../generated/hasura/react";
import { useParams } from "react-router-dom";

gql`
  fragment SingleTeam on teams {
    id
    name
    affiliation
    bracket
    country
    created
    website
    members {
      id
      name
      affiliation
      avatar
      bracket
      country
      type
      website
      captain_of {
        id
      }
      score
    }
    score_timeline {
      event_time
      score
    }
  }
`;

type TeamParams = {
  id: string;
};

export default function Team() {
  let { id }: TeamParams = useParams();
  const { data } = GQLHooks.Fragments.SingleTeam.useQueryById({
    teamsId: parseInt(id),
  });
  return <p>{JSON.stringify(data)}</p>;
}
