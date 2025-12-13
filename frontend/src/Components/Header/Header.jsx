import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import MosqueIcon from '@mui/icons-material/Mosque';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Box className="header-left">
          <MosqueIcon className="logo-icon" />
          <Typography variant="h5" className="logo-text">
            Ayah Jar
          </Typography>
        </Box>
        
        <Box className="nav-links">
          <Button component={Link} to="/" className="nav-link">
            Home
          </Button>
          <Button component={Link} to="/jar" className="nav-link">
            The Jar
          </Button>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;