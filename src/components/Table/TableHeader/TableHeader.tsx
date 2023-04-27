import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { FC } from "react";
import { SortEnum } from "../../../mobx/post/types";
import styles from "./TableHeader.module.scss";

interface ITableHeaderProps {
  header: { [key: string]: { name: string; sort?: boolean; isDate?: boolean } };
  filters: { [key: string]: any };
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  fetchData: (filters: { [key: string]: any }) => void;
}

const TableHeader: FC<ITableHeaderProps> = (props: ITableHeaderProps) => {
  const {
    header,
    filters,
    onSelectAllClick,
    numSelected,
    rowCount,
    fetchData,
  } = props;
  const sortBy = filters.sortBy,
    sort = filters.sort.toLowerCase();

  const sortData = (field: string) => {
    const requestFilters = {
      ...filters,
      sortBy: field,
      sort:
        sortBy !== field
          ? SortEnum.ASC
          : sort === "asc"
          ? SortEnum.DESC
          : SortEnum.ASC,
    };

    fetchData(requestFilters);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {Object.keys(header).map((field) => {
          if (header[field].sort) {
            return (
              <TableCell
                key={header[field].name}
                align={"right"}
                padding={"normal"}
                sortDirection={sortBy === header[field].name ? sort : false}
              >
                <TableSortLabel
                  className={styles.header_text}
                  active={sortBy === field}
                  direction={sortBy === field ? sort : "asc"}
                  onClick={() => sortData(field)}
                >
                  {header[field].name}
                  {sortBy === field ? (
                    <Box component="span" sx={visuallyHidden}>
                      {sort === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
          return (
            <TableCell
              className={styles.header_text}
              key={header[field].name}
              align={"right"}
              padding={"normal"}
            >
              {header[field].name}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
