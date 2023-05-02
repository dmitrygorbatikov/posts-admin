import React, { useState } from 'react';
import { Formik } from 'formik';
import { LoginSchema } from '../../validation/auth';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { observer } from 'mobx-react';
import AuthStore from '../../mobx/auth';
import Spinner from '../../components/Spinner/Spinner';
import CustomValidationInput from '../../components/Input/CustomValidationInput/CustomValidationInput';
import styles from './SIgnInPage.module.scss';

function SignInPage(): JSX.Element {
  const { signInUser, loading, loginErrors, clearErrors } = AuthStore;
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box className={styles.container}>
      {loading && <Spinner />}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values) => {
          await signInUser(values);
        }}
        validationSchema={LoginSchema}
      >
        {({ handleSubmit }) => {
          return (
            <Box className={styles.formik_container}>
              <Typography
                className={styles.formik_container__title}
                variant={'h3'}
              >
                {t('Login.Title')}
              </Typography>
              <CustomValidationInput
                clearErrors={clearErrors}
                errors={loginErrors}
                width={400}
                formControlProps={{ sx: { mb: 2 } }}
                label={t('Login.EmailLabel')}
                fieldName={'email'}
              />
              <CustomValidationInput
                type={!showPassword ? 'text' : 'password'}
                clearErrors={clearErrors}
                errors={loginErrors}
                width={400}
                formControlProps={{ sx: { mb: 2 } }}
                endAdornment={() => (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
                label={t('Login.PasswordLabel')}
                fieldName={'password'}
              />
              <Button
                className={styles.formik_container__submit_btn}
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                variant={'contained'}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {t('Login.Button').toUpperCase()}
              </Button>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}

export default observer(SignInPage);
