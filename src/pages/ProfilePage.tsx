import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import UserStore from "../mobx/user";
import Spinner from "../components/Spinner";
import moment from "moment-timezone";
import EditIcon from "@mui/icons-material/Edit";
import CustomInput from "../components/Input/CustomInput";
import { Formik } from "formik";
import { ChangePasswordSchema } from "../validation/profile";
const ProfilePage: FC = () => {
  const { getProfile, user, loading } = UserStore;
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  useEffect(() => {
    getProfile().then();
  }, []);
  return (
    <Box>
      {loading && <Spinner />}
      {user && (
        <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
          <Box
            sx={{
              maxWidth: 500,
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              mb: 3,
            }}
          >
            <Typography variant={"h4"}>Profile</Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
          <Box>
            <Typography>name: {user.name}</Typography>
            <Typography>email: {user.name}</Typography>
            <Typography>
              created at:
              {moment(user.created_at)
                .tz(userTimezone)
                .format("DD.MM.YY hh:ss")}
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: 500,
              mt: 3,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                mb: 3,
              }}
              variant={"h4"}
            >
              Change password
            </Typography>
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
              validationSchema={ChangePasswordSchema}
            >
              {({ values, handleChange, handleSubmit, errors }) => {
                Boolean(errors);
                return (
                  <Box sx={{ float: "left" }}>
                    <CustomInput
                      error={errors.oldPassword}
                      sx={{ m: 0, mb: 2 }}
                      value={values.oldPassword}
                      label={"Old password"}
                      changeHandler={handleChange("oldPassword")}
                    />
                    <CustomInput
                      error={errors.newPassword}
                      sx={{ m: 0, mb: 2 }}
                      value={values.newPassword}
                      label={"New password"}
                      changeHandler={handleChange("newPassword")}
                    />
                    <Button
                      disabled={true}
                      variant={"contained"}
                      onClick={() => handleSubmit()}
                    >
                      Change
                    </Button>
                  </Box>
                );
              }}
            </Formik>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default observer(ProfilePage);
