import { ReactNode } from "react";
import { QueryUserListObjectsQuery } from "../generated";
import {
  StatefulDataTable,
  NumericalColumn,
  StringColumn,
} from 'baseui/data-table';
import { useStyletron } from "baseui";

type ScoreboardTableProps = {
  users?: Array<any>;
};



export default function UsersTable({ users }: ScoreboardTableProps) {
  console.log(users);
  const generateUsersTable = () => {
    const result: Array<Array<ReactNode>> = [];
    users?.map((item, idx) =>{
        let userData: any = { name: item?.name, website: item?.website, affiliation: item?.affiliation, country: item?.country};
        result.push(userData)
      }
    );
    return result;
  };

  type rowData = [
    number,
    string,
    string,
    string,
    string,
  ];

  const columns = [
    NumericalColumn({
      title: 'ID',
      mapDataToValue: (data: rowData) => data[0],
    }),
    StringColumn({
      title: 'Name',
      mapDataToValue: (data: rowData) => data[1],
    }),
    StringColumn({
      title: 'Website',
      mapDataToValue: (data: rowData) => data[2],
    }),
    StringColumn({
      title: 'Affiliation',
      mapDataToValue: (data: rowData) => data[3],
    }),
    StringColumn({
      title: 'Country',
      mapDataToValue: (data: rowData) => data[4],
    }),
  ];

  const [css] = useStyletron();

  return (
    <div className={css({height: '800px'})}>
      <StatefulDataTable columns={columns} rows={generateUsersTable()} />
    </div>
  );
}
