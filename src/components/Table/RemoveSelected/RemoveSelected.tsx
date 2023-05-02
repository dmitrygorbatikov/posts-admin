import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface IRemoveSelectedProps {
  selected: string[];
  removeList: (ids: string[]) => void;
}
const RemoveSelected: FC<IRemoveSelectedProps> = ({ removeList, selected }) => {
  const { t } = useTranslation();
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
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {t('Posts.AreYouSureDelBtn')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={'outlined'} onClick={handleClose}>
            {t('Posts.Cancel')}
          </Button>
          <Button
            variant={'contained'}
            onClick={async () => {
              await removeList(selected);
              handleClose();
            }}
          >
            {t('Posts.Delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RemoveSelected;
