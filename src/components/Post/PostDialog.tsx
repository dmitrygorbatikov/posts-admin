import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Spinner from "../Spinner";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Formik } from "formik";
import { DialogPostSchema } from "../../validation/post";
import CustomValidationInput from "../Input/CustomValidationInput";

interface IPostDialogProps {
  loading: boolean;
  submitChanges: (values: {
    title: string;
    description: string;
    link: string;
  }) => void;
  initialValues: { title: string; description: string; link: string };
  dialogTitle: string;
  submitButtonText: string;
  openDialogBtnText: string;
  colorDialogBtn: "success" | "inherit";
  variantDialogBtn: "contained" | "outlined";
}
const PostDialog: FC<IPostDialogProps> = ({
  loading,
  submitChanges,
  initialValues,
  dialogTitle,
  submitButtonText,
  openDialogBtnText,
  colorDialogBtn,
  variantDialogBtn,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box>
      {loading && <Spinner />}
      <Button
        onClick={handleOpen}
        sx={{ mr: 2 }}
        color={colorDialogBtn}
        variant={variantDialogBtn}
      >
        {openDialogBtnText}
      </Button>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await submitChanges(values);
          handleClose();
        }}
        validationSchema={DialogPostSchema}
      >
        {({ handleSubmit, errors }) => {
          console.log(errors);
          return (
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <CustomValidationInput
                    fieldName={"title"}
                    label={"Title"}
                    formControlProps={{ sx: { m: 2 } }}
                  />
                  <CustomValidationInput
                    fieldName={"description"}
                    label={"Description"}
                    formControlProps={{ sx: { m: 2 } }}
                  />
                  <CustomValidationInput
                    fieldName={"link"}
                    label={"Link"}
                    formControlProps={{ sx: { m: 2 } }}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant={"outlined"} onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant={"contained"} onClick={() => handleSubmit()}>
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
