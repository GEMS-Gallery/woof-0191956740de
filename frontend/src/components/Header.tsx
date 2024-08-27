import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dog Walking Business
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/walkers">
          Walkers
        </Button>
        <Button color="inherit" component={RouterLink} to="/book">
          Book a Walk
        </Button>
        <Button color="inherit" component={RouterLink} to="/register">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
