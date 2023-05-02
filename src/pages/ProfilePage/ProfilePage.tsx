import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box } from '@mui/material';
import UserStore from '../../mobx/user';
import Spinner from '../../components/Spinner/Spinner';
import UserProfileComponent from './UserProfileComponent/UserProfileComponent';
import ChangePassword from './ChangePassword/ChangePassword';
import styles from './ProfilePage.module.scss';

const ProfilePage: FC = () => {
  const {
    getProfile,
    user,
    loading,
    changePassword,
    changeProfile,
    changeProfileErrors,
    changePasswordErrors,
    clearErrors,
  } = UserStore;

  useEffect(() => {
    getProfile().then();
  }, []);
  return (
    <Box className={styles.container}>
      {loading && <Spinner />}
      {user && (
        <Box className={styles.user}>
          <UserProfileComponent
            changeProfileErrors={changeProfileErrors}
            user={user}
            clearErrors={clearErrors}
            changeProfile={changeProfile}
          />
          <ChangePassword
            changePassword={changePassword}
            clearErrors={clearErrors}
            changePasswordErrors={changePasswordErrors}
          />
        </Box>
      )}
    </Box>
  );
};

export default observer(ProfilePage);
