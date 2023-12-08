import { AppBar, Toolbar, Button, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Grow = styled("div")({
    flexGrow: 1,
  });
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/search");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button onClick={handleLogoClick} color="inherit">
          AutoLogo
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <TextField
            id="navbar-suche"
            label="Suche"
            variant="outlined"
            color="secondary"
          />
        </Typography>
        <Grow />
        <Typography variant="h6" component="div">
          <TextField
            id="navbar-benutzer"
            label="Benutzer"
            variant="outlined"
            color="secondary"
          />
        </Typography>
        <Typography variant="h6" component="div">
          <TextField
            id="navbar-passwort"
            label="Passwort"
            variant="outlined"
            color="secondary"
          />
        </Typography>
        <Button onClick={handleLoginClick} color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
