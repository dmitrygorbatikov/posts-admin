import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { FC, useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import CustomInput from "../Input/CustomInput";
import TableBodyComponent from "./TableBodyComponent";
import { Typography } from "@mui/material";

interface ITableComponentProps {
  rows: any[];
  header: { [key: string]: { name: string; sort?: boolean } };
  filters: { [key: string]: any };
  fetchData: (filters: { [key: string]: any }) => void;
  count: number;
  removeList: (ids: string[]) => void;
  selected: string[];
  setSelected: (value: string[]) => void;
}

const TableComponent: FC<ITableComponentProps> = ({
  rows,
  header,
  filters,
  fetchData,
  count,
  selected,
  setSelected,
}) => {
  rows = rows.map((item) => {
    const _item = item;
    // delete _item._id;
    delete _item.updated_at;
    delete _item.__v;
    return _item;
  });
  const [pageInput, setPageInput] = useState("0");

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = async (page: number) => {
    const newFilters = {
      ...filters,
      page: page.toString(),
    };
    await fetchData(newFilters);
  };

  const handleChangeRowsPerPage = async (event: any) => {
    const newFilters = {
      ...filters,
      perPage: event.target.value.toString(),
    };
    await fetchData(newFilters);
  };

  useEffect(() => {
    setPageInput(filters.page);
  }, [filters.page]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {rows.length > 0 && (
          <>
            <TableContainer>
              <Table
                sx={{ minWidth: 750, mt: 28.5 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <TableHeader
                  numSelected={selected.length}
                  rowCount={rows.length}
                  onSelectAllClick={handleSelectAllClick}
                  header={header}
                  filters={filters}
                  fetchData={fetchData}
                />
                <TableBody>
                  {rows.map((row, index) => {
                    return (
                      <TableBodyComponent
                        row={row}
                        selected={selected}
                        setSelected={setSelected}
                        index={index}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                pointerEvents: selected.length === 1 ? "none" : "auto",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <CustomInput
                sx={{ maxWidth: 65 }}
                value={pageInput}
                label={"Page"}
                changeHandler={(e) => setPageInput(e.target.value)}
                handleSubmit={() => handleChangePage(Number(pageInput))}
              />
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={Number(filters.perPage)}
                page={Number(filters.page)}
                onPageChange={(event, newPage) => handleChangePage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </>
        )}
        {rows.length === 0 && (
          <Box sx={{ pt: 28.5, pb: 4, ml: 2 }}>
            <Typography>No data found</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TableComponent;
