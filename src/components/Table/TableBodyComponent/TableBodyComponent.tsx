import { FC } from "react";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import moment from "moment";
import styles from "./TableBodyComponent.module.scss";

interface ITableBodyProps {
  row: any;
  selected: any;
  setSelected: (value: any) => void;
  index: number;
  header: { [key: string]: { name: string; sort?: boolean; isDate?: boolean } };
}

const TableBodyComponent: FC<ITableBodyProps> = ({
  row,
  selected,
  setSelected,
  index,
  header,
}) => {
  const isSelected = (link: string) => {
    return selected.indexOf(link) !== -1;
  };
  const isItemSelected = isSelected(row._id);
  const labelId = `enhanced-table-checkbox-${index}`;
  const handleClickRow = (event: React.MouseEvent<unknown>, _id: string) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <TableRow
      hover
      onClick={(event) => handleClickRow(event, row._id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row._id}
      selected={isItemSelected}
      className={styles.row}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      {Object.keys(row).map((key, index) => {
        const data = header[key]?.isDate
          ? moment(row[key]).format("DD.MM.YYYY hh:ss")
          : row[key];

        if (key !== "_id") {
          return (
            <TableCell
              className={styles.cell}
              key={`${row._id}-${index}`}
              align="right"
            >
              {data}
            </TableCell>
          );
        }
        return null;
      })}
    </TableRow>
  );
};
export default TableBodyComponent;
