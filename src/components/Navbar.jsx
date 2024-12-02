import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar className="bg-blue-500">
        <Typography variant="h6" className="flex-grow">
          <Link to="/" className="text-white">
            AmbienSoft
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/about" className="text-white">Sobre</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;