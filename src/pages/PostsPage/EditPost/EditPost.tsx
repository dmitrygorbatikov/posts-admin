import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const EditPost: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box sx={{ mr: 2 }}>
      <Button onClick={handleOpen} variant={'outlined'} color={'secondary'}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Edit post</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={'outlined'} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant={'contained'}
            onClick={async () => {
              handleClose();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditPost;
