import React from 'react';
import { AppBar, Toolbar, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button onClick={handleLogoClick} color="inherit">
          AutoLogo
        </Button>
        <Button onClick={handleSearchClick} variant="contained" color="primary">
          Erweiterte Suche <SearchIcon />
        </Button>
        <div style={{ marginLeft: 'auto' }} /> {/* Create a spacer to push the fields to the right */}
        <TextField
          id="navbar-suche"
          label="Suche"
          variant="outlined"
          color="secondary"
          style={{ marginLeft: '10px' }} // Adjust the margin as needed
        />
        <TextField
          id="navbar-benutzer"
          label="Benutzer"
          variant="outlined"
          color="secondary"
          style={{ marginLeft: '10px' }} // Adjust the margin as needed
        />
        <TextField
          id="navbar-passwort"
          label="Passwort"
          variant="outlined"
          color="secondary"
          style={{ marginLeft: '10px' }} // Adjust the margin as needed
        />
        <Button onClick={handleLoginClick} color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
