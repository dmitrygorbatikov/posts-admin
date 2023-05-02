import React, { FC, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import { ChangePasswordSchema } from '../../../validation/profile';
import CustomValidationInput from '../../../components/Input/CustomValidationInput/CustomValidationInput';
import { IChangePasswordBody } from '../../../mobx/user/types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IRequestError } from '../../../types';
import styles from './ChangePassword.module.scss';
import { useTranslation } from 'react-i18next';
interface IChangePasswordProps {
  clearErrors: () => void;
  changePasswordErrors?: IRequestError;
  changePassword: (body: IChangePasswordBody) => void;
}
const ChangePassword: FC<IChangePasswordProps> = ({
  changePasswordErrors,
  clearErrors,
  changePassword,
}) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const { t } = useTranslation();
  return (
    <Box className={styles.container}>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          repeatNewPassword: '',
        }}
        onSubmit={async (values) => {
          const { oldPassword, newPassword } = values;
          await changePassword({ oldPassword, newPassword });
        }}
        validationSchema={ChangePasswordSchema}
      >
        {({ handleSubmit, errors }) => {
          Boolean(errors);
          return (
            <Box className={styles.formik_container}>
              <Typography variant={'h4'}>Change password</Typography>

              <CustomValidationInput
                clearErrors={clearErrors}
                errors={changePasswordErrors}
                type={showOldPassword ? 'text' : 'password'}
                endAdornment={() => (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge='end'
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
                formControlProps={{ sx: { mt: 2, display: 'block' } }}
                label={t('Profile.OldPassword')}
                fieldName={'oldPassword'}
              />
              <CustomValidationInput
                clearErrors={clearErrors}
                errors={changePasswordErrors}
                type={showNewPassword ? 'text' : 'password'}
                endAdornment={() => (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge='end'
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
                formControlProps={{ sx: { mt: 2, display: 'block' } }}
                label={t('Profile.NewPassword')}
                fieldName={'newPassword'}
              />
              <CustomValidationInput
                clearErrors={clearErrors}
                errors={changePasswordErrors}
                type={showRepeatNewPassword ? 'text' : 'password'}
                endAdornment={() => (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() =>
                        setShowRepeatNewPassword(!showRepeatNewPassword)
                      }
                      onMouseDown={(e) => e.preventDefault()}
                      edge='end'
                    >
                      {showRepeatNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )}
                formControlProps={{ sx: { mt: 2, display: 'block' } }}
                label={t('Profile.RepeatNewPassword')}
                fieldName={'repeatNewPassword'}
              />
              <Button
                sx={{ mt: 2 }}
                variant={'contained'}
                onClick={() => handleSubmit()}
              >
                {t('Profile.Change')}
              </Button>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
