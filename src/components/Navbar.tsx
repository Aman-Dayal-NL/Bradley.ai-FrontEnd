import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: 'white', color: 'black', zIndex: 1000, boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)' }}> 
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Roboto Condensed, sans-serif' }}>
            Bradley.ai
          </Typography>
          <Button color="inherit" sx={{fontFamily: 'Roboto Condensed, sans-serif'}}>Logout</Button>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;