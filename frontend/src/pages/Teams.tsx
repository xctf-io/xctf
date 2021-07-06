import { GQLHooks } from "../generated/hasura/react";

export default function Teams() {
  const { data } = GQLHooks.Fragments.TeamList.useQueryObjects({
    variables: { limit: 10 },
  });
  return <p>{JSON.stringify(data)}</p>;
}
