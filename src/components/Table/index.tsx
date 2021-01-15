import React from 'react';

import { ContainerTable, TableContent } from './styles';

interface TableProps {
  nameOne?: string;
  nameTwo?: string;
  nameTree?: string;
  nameFour?: string;
  nameFive?: string;
}

const Table: React.FC<TableProps> = ({
  children,
  nameOne,
  nameTwo,
  nameTree,
  nameFour,
  nameFive,
}) => (
  <ContainerTable>
    <TableContent>
      <thead>
        <tr>
          <th>{nameOne}</th>
          <th>{nameTwo}</th>
          {nameTree && <th>{nameTree}</th>}
          {nameFour && <th>{nameFour}</th>}
          {nameFive && <th>{nameFive}</th>}
          <th className="action">Ação</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </TableContent>
  </ContainerTable>
);

export default Table;
