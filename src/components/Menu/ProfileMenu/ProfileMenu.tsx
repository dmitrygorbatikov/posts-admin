import React, { FC } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './ProfileMenu.module.scss';
interface IProfileMenuProps {
  logoutUser: () => void;
}
const ProfileMenu: FC<IProfileMenuProps> = ({ logoutUser }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size='large'
        edge='end'
        aria-label='change language'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className={styles.profileLink} to={'/profile'}>
            {t('Menu.Profile')}
          </Link>
        </MenuItem>
        <MenuItem onClick={logoutUser}>
          <Box>{t('Menu.Logout')}</Box>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
