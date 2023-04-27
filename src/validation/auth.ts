import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .lowercase()
    .trim()
    .email("InvalidEmail")
    .required("Required"),


  password: Yup.string()
    .min(6, "Min6")
    .max(30, "Max30")
    .trim()
    .required("Required"),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().lowercase().trim().required("Required"),
  email: Yup.string()
    .lowercase()
    .trim()
    .email("InvalidEmail")
    .required("Required"),
  password: Yup.string()
    .min(6, "Min6")
    .max(30, "Max30")
    .trim()
    .required("Required"),
});
