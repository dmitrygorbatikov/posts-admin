import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { FC } from "react";
import RemoveSelected from "./RemoveSelected";
interface ITableToolbarProps {
  selected: string[];
  removeList: (ids: string[]) => void;
}
const TableToolbar: FC<ITableToolbarProps> = ({ removeList, selected }) => {
  const numSelected = selected.length;

  return (
    <Toolbar
      sx={{
        display: numSelected > 0 ? "block" : "none",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignitems: "center",
          }}
        >
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete">
            <RemoveSelected removeList={removeList} selected={selected} />
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
