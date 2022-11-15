import UsersTable from "./UsersTable";
import { GQLHooks } from "../../generated/hasura/react";
import { Pagination } from "baseui/pagination";
import { useState } from "react";
import { Input } from "baseui/input";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);

  const filter = searchName ? { name: { _ilike: `%${searchName}%` } } : {};

  const { data } = GQLHooks.Fragments.UserList.useQueryObjects({
    variables: { limit: 10, offset: currentPage - 1, where: filter },
  });

  return (
    <>
      <Input
        placeholder="Team Name"
        clearOnEscape
        value={searchName}
        onChange={(e) => {
          //@ts-ignore
          return setSearchName(e.target.value);
        }} />
      <UsersTable users={data?.user} />
      <Pagination
        numPages={20}
        currentPage={currentPage}
        onPageChange={({ nextPage }) => {
          setCurrentPage(
            Math.min(Math.max(nextPage, 1), 20),
          );
        }}
      />
    </>
  );
}
