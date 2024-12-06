import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar className="bg-blue-500">
        <Typography variant="h5" className="flex-grow">
          <Link to="/" className="text-white">
            AmbienSoft
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/" className="text-white"></Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;