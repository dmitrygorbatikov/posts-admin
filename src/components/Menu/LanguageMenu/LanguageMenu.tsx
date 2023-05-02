import React, { FC } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import Flag from 'react-world-flags';
import { Language } from '@mui/icons-material';
import i18next from '../../../locales/i18-next';
import styles from './LanguageMenu.module.scss';
const LanguageMenu: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const currentLanguage = localStorage.getItem('language') || 'ua';

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language: 'en' | 'ua') => {
    localStorage.setItem('language', language);
    i18next.changeLanguage(language);
    handleClose();
  };
  return (
    <div className={styles.container}>
      <Flag code={currentLanguage === 'en' ? 'US' : 'UA'} height='16' />
      <IconButton
        size='large'
        edge='end'
        aria-label='change language'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <Language />
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
        <MenuItem onClick={() => changeLanguage('ua')}>
          <Flag code={'UA'} height='16' />
          <Box className={styles.language_box}>Українська</Box>
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>
          <Flag code={'US'} height='16' />
          <Box className={styles.language_box}>English</Box>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageMenu;
