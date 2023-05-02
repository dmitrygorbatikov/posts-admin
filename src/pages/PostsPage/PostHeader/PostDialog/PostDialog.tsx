import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Formik } from 'formik';
import { DialogPostSchema } from '../../../../validation/post';
import CustomValidationInput from '../../../../components/Input/CustomValidationInput/CustomValidationInput';
import { IRequestError } from '../../../../types';
import styles from './PostDialog.module.scss';
import { useTranslation } from 'react-i18next';

interface IPostDialogProps {
  loading: boolean;
  submitChanges: (
    values: {
      title: string;
      description: string;
      link: string;
    },
    cb: () => void
  ) => void;
  initialValues: { title: string; description: string; link: string };
  dialogTitle: string;
  submitButtonText: string;
  openDialogBtnText: string;
  colorDialogBtn: 'success' | 'inherit';
  variantDialogBtn: 'contained' | 'outlined';
  clearErrors: () => void;
  errors?: IRequestError;
}
const PostDialog: FC<IPostDialogProps> = ({
  submitChanges,
  initialValues,
  dialogTitle,
  submitButtonText,
  openDialogBtnText,
  colorDialogBtn,
  variantDialogBtn,
  clearErrors,
  errors,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box>
      <Button
        onClick={handleOpen}
        className={styles.open_btn}
        color={colorDialogBtn}
        variant={variantDialogBtn}
      >
        {openDialogBtnText}
      </Button>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await submitChanges(values, handleClose);
        }}
        validationSchema={DialogPostSchema}
      >
        {({ handleSubmit }) => {
          return (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  <CustomValidationInput
                    errors={errors}
                    clearErrors={clearErrors}
                    fieldName={'title'}
                    label={t('Posts.Title')}
                    formControlProps={{ sx: { m: 2 } }}
                  />
                  <CustomValidationInput
                    errors={errors}
                    clearErrors={clearErrors}
                    fieldName={'description'}
                    label={t('Posts.Description')}
                    formControlProps={{ sx: { m: 2 } }}
                  />
                  <CustomValidationInput
                    errors={errors}
                    clearErrors={clearErrors}
                    fieldName={'link'}
                    label={t('Posts.Link')}
                    formControlProps={{ sx: { m: 2 } }}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant={'outlined'} onClick={handleClose}>
                  {t('Posts.Cancel')}
                </Button>
                <Button variant={'contained'} onClick={() => handleSubmit()}>
                  {submitButtonText}
                </Button>
              </DialogActions>
            </Dialog>
          );
        }}
      </Formik>
    </Box>
  );
};

export default PostDialog;
