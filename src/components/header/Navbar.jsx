import { AppBar, Toolbar, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useHistory } from 'react-router-dom';
const Navbar = () => {

  const Grow = styled('div')({
    flexGrow: 1,
  });
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/new-path');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button onClick={handleButtonClick} color="inherit">AutoLogo</Button>
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
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
