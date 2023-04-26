import { Alert, Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Toast = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      key={"topright"}
    >
      <Alert severity={"error"} sx={{ width: "100%" }}>
        {t("Something went wrong")}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
