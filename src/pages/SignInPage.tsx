import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { LoginSchema } from "../validation/auth";
import { useTranslation } from "react-i18next";
import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CustomInput from "../components/Input/CustomInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { observer } from "mobx-react";
import AuthStore from "../mobx/auth";
import Spinner from "../components/Spinner";
function SignInPage(): JSX.Element {
  const { signInUser, loading } = AuthStore;
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   if (error?.message) {
  //     console.log(true);
  //     dispatch(
  //       setOpenToast({
  //         message: `Errors.${error?.message}`,
  //         type: "error",
  //       })
  //     );
  //   }
  //   const timerId = setTimeout(() => {
  //     dispatch(setCloseToast());
  //   }, 3000);
  //
  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [error?.message]);

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && <Spinner />}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          await signInUser(values);
        }}
        validationSchema={LoginSchema}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomInput
                handleSubmit={handleSubmit}
                value={values.email}
                label={t("Login.EmailLabel")}
                endAdornment={
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                }
                autoComplete="email"
                error={
                  errors.email
                  // || authErrorsObject.email
                }
                touched={touched.email}
                changeHandler={handleChange("email")}
              />

              <CustomInput
                type={showPassword ? "password" : "text"}
                handleSubmit={handleSubmit}
                value={values.password}
                label={t("Login.PasswordLabel")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                error={
                  errors.password
                  // || authErrorsObject.email
                }
                touched={touched.password}
                changeHandler={handleChange("password")}
              />
              <Button
                sx={{ width: "80%" }}
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                variant={"contained"}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {t("Login.Button").toUpperCase()}
              </Button>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}

export default observer(SignInPage);
