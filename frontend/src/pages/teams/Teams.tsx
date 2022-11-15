import { GQLHooks } from "../../generated/hasura/react";
import TeamsTable from "./TeamsTable";
import { Input } from "baseui/input";
import { Pagination } from "baseui/pagination";
import { useState } from "react";

export default function Teams() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);

  const filter = searchName ? { name: { _ilike: `%${searchName}%` } } : {};

  const limit = 10;

  const { data } = GQLHooks.Fragments.TeamList.useQueryObjects({
    variables: { limit, offset: (currentPage - 1) * limit, where: filter },
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
      <TeamsTable teams={data?.team} />
      <Pagination
        numPages={20}
        currentPage={currentPage}
        onPageChange={({ nextPage }) => {
          setCurrentPage(
            Math.min(Math.max(nextPage, 1)),
          );
        }}
      />
    </>
  );
}
