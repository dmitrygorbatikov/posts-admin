import { FC } from "react";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

interface ITableBodyProps {
  row: any;
  selected: any;
  setSelected: (value: any) => void;
  index: number;
}

const TableBodyComponent: FC<ITableBodyProps> = ({
  row,
  selected,
  setSelected,
  index,
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
      sx={{ cursor: "pointer", maxWidth: 500 }}
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
        if (key !== "_id") {
          return (
            <TableCell
              sx={{ maxWidth: 900, wordWrap: "break-word" }}
              key={`${row._id}-${index}`}
              align="right"
            >
              {row[key]}
            </TableCell>
          );
        }
        return null;
      })}
    </TableRow>
  );
};
export default TableBodyComponent;
