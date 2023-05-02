import React, { FC, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Formik } from 'formik';
import { ChangeProfileSchema } from '../../../validation/profile';
import CustomValidationInput from '../../../components/Input/CustomValidationInput/CustomValidationInput';
import moment from 'moment';
import { IChangeProfile, IUser } from '../../../mobx/user/types';
import { IRequestError } from '../../../types';
import styles from './UserProfileComponent.module.scss';
import { useTranslation } from 'react-i18next';
interface IUserProfileComponentProps {
  user: IUser;
  changeProfileErrors?: IRequestError;
  clearErrors: () => void;
  changeProfile: (body: IChangeProfile, cb: () => void) => void;
}
const UserProfileComponent: FC<IUserProfileComponentProps> = ({
  user,
  changeProfileErrors,
  clearErrors,
  changeProfile,
}) => {
  const { t } = useTranslation();
  const [isEditProfile, setIsEditProfile] = useState(false);

  return (
    <Box>
      <Box className={styles.header_container}>
        <Typography variant={'h4'}>{t('Profile.Title')}</Typography>
        {!isEditProfile ? (
          <IconButton onClick={() => setIsEditProfile(true)}>
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditProfile(false)}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>
      <Box>
        {isEditProfile && (
          <Formik
            initialValues={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={async (values) => {
              await changeProfile(values, () => setIsEditProfile(false));
            }}
            validationSchema={ChangeProfileSchema}
          >
            {({ handleSubmit }) => {
              return (
                <Box className={styles.formik_container}>
                  <CustomValidationInput
                    clearErrors={clearErrors}
                    errors={changeProfileErrors}
                    formControlProps={{ sx: { mb: 2, display: 'block' } }}
                    label={t('Profile.NameLabel')}
                    fieldName={'name'}
                  />
                  <CustomValidationInput
                    clearErrors={clearErrors}
                    errors={changeProfileErrors}
                    formControlProps={{ sx: { mb: 2, display: 'block' } }}
                    label={t('Profile.EmailLabel')}
                    fieldName={'email'}
                  />
                  <Typography>
                    {t('Profile.CreatedAt')}
                    {moment(user.created_at).format('DD.MM.YY')}
                  </Typography>
                  <Button variant={'contained'} onClick={() => handleSubmit()}>
                    {t('Profile.Save')}
                  </Button>
                </Box>
              );
            }}
          </Formik>
        )}
        {!isEditProfile && (
          <Box>
            <Typography>
              {t('Profile.Name')}: {user.name}
            </Typography>
            <Typography>
              {t('Profile.Email')}: {user.email}
            </Typography>
            <Typography>
              {t('Profile.CreatedAt')}:
              {moment(user.created_at).format('DD.MM.YY')}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserProfileComponent;
