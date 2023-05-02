import { FC } from 'react';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import moment from 'moment';
import styles from './TableBodyComponent.module.scss';

interface ITableBodyProps {
  row: any;
  selected: any;
  setSelected: (value: any) => void;
  index: number;
  header: { [key: string]: { name: string; sort?: boolean; isDate?: boolean } };
  labelId: string;
  isItemSelected: boolean;
}

const TableBodyComponent: FC<ITableBodyProps> = ({
  row,
  header,
  labelId,
  isItemSelected,
}) => {
  return (
    <>
      <TableCell padding='checkbox'>
        <Checkbox
          color='primary'
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      {Object.keys(row).map((key, index) => {
        const data = header[key]?.isDate
          ? moment(row[key]).format('DD.MM.YYYY hh:ss')
          : row[key];

        if (key !== '_id') {
          return (
            <TableCell
              className={styles.cell}
              key={`${row._id}-${index}`}
              align='right'
            >
              {data}
            </TableCell>
          );
        }
        return null;
      })}
    </>
  );
};
export default TableBodyComponent;
