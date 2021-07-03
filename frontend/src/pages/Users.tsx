import { gql } from "@apollo/client";

gql`
  fragment UserList on users {
    id
    name
    website
    affiliation
    country
  }
`;

export default function Users() {
  return <p>users</p>;
}
