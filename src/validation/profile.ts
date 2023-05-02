import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Min6')
    .max(30, 'Max30')
    .trim()
    .required('Required'),
  newPassword: Yup.string()
    .min(6, 'Min6')
    .max(30, 'Max30')
    .trim()
    .required('Required')
    .test('match', 'PasswordsMustMatch', function (value) {
      return this.parent.repeatNewPassword === value;
    }),
  repeatNewPassword: Yup.string()
    .min(6, 'Min6')
    .max(30, 'Max30')
    .trim()
    .required('Required')
    .test('match', 'PasswordsMustMatch', function (value) {
      return this.parent.newPassword === value;
    }),
});

export const ChangeProfileSchema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
  email: Yup.string()
    .lowercase()
    .trim()
    .email('InvalidEmail')
    .required('Required'),
});
