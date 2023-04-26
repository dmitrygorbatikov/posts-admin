import React, { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Spinner: FC = () => {
  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        position: 'fixed',
        pointerEvents: 'auto',
        zIndex: 99999,
        opacity: 0.5,
        width: '100%',
        height: '100%',
        background: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Spinner;
