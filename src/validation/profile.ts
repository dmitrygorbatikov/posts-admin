import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, "Min6")
    .max(30, "Max30")
    .trim()
    .required("Required"),
  newPassword: Yup.string()
    .min(6, "Min6")
    .max(30, "Max30")
    .trim()
    .required("Required"),
});
