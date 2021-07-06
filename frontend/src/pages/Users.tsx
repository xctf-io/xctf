import UsersTable from "../components/UsersTable";
import { GQLHooks } from "../generated/hasura/react";

export default function Users() {
  const { data } = GQLHooks.Fragments.UserList.useQueryObjects({
    variables: { limit: 10 },
  });

  return <UsersTable users={data?.users} />;
}
