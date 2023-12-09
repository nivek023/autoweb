import { useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  TextField,
  Button,
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox, 
  RadioGroup, 
  Radio
} from '@mui/material';

const AutoSuche = () => {
  const [autoData, setAutoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      let apiUrl = '/api';
  
      if (searchTerm) {
        apiUrl += `?modellbezeichnung=${searchTerm}`;
      }

      if (searchText) {
        apiUrl += `${searchTerm ? '&' : '?'}fin=${searchText}`;
      }
  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setAutoData(Array.isArray(data._embedded.autos) ? data._embedded.autos : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Suchformular
      </Typography>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Modellbezeichnung"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Fin"
              variant="outlined"
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Hersteller</InputLabel>
              <Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                label="Hersteller"
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <FormControlLabel
              control={<Checkbox checked={checkboxChecked} onChange={(e) => setCheckboxChecked(e.target.checked)} />}
              label="ist ein aktuelles Modell"
            />
          </Grid>
          <Grid item xs={12}>
            <RadioGroup
              aria-label="Radio options"
              name="radio-options"
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
              row
            >
              <FormControlLabel value="Option A" control={<Radio />} label="Manuell" />
              <FormControlLabel value="Option B" control={<Radio />} label="Automatik" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginBottom: '20px' }}>
              Suche
            </Button>
          </Grid>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Modellbezeichnung</TableCell>
                <TableCell>Fin</TableCell>
                <TableCell>Hersteller</TableCell>
                <TableCell>Kilometerstand</TableCell>
                <TableCell>Auslieferungstag</TableCell>
                <TableCell>Grundpreis</TableCell>
                <TableCell>ist aktuelles Modell</TableCell>
                <TableCell>Getriebeart</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {autoData.map((auto) => (
                <TableRow key={auto.id}>
                  <TableCell>{auto.modellbezeichnung}</TableCell>
                  <TableCell>{auto.fin}</TableCell>
                  <TableCell>{auto.hersteller}</TableCell>
                  <TableCell>{auto.kilometerstand}</TableCell>
                  <TableCell>{auto.auslieferungstag}</TableCell>
                  <TableCell>{auto.grundpreis}</TableCell>
                  <TableCell>{auto.istAktuellesModell}</TableCell>
                  <TableCell>{auto.getriebeArt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
       </Grid>
      </form>
    </div>
  );
};

export default AutoSuche;
