import React, { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import styles from './Spinner.module.scss';

const Spinner: FC = () => {
  return (
    <Box className={styles.container}>
      <CircularProgress color='inherit' />
    </Box>
  );
};

export default Spinner;
