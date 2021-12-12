import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function MainBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" noWrap component="div">
          Babazon Inventory
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
