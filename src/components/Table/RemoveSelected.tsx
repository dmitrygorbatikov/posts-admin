import { FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

interface IRemoveSelectedProps {
  selected: string[];
  removeList: (ids: string[]) => void;
}
const RemoveSelected: FC<IRemoveSelectedProps> = ({ removeList, selected }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure that you want to delete this items ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant={"contained"}
            onClick={async () => {
              await removeList(selected);
              handleClose();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RemoveSelected;
