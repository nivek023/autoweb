import { useState, useEffect  } from 'react';
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
  Radio,
} from '@mui/material';
import { Check, Close, Search   } from '@mui/icons-material'; 

const AutoSuche = () => {
  const [autoData, setAutoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchModellBezeichnung, setSearchModellBezeichnung] = useState('');

  const [searchFin, setSearchFin] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isAktuellesModell, setIsAktuellesModell] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [manufacturerOptions, setManufacturerOptions] = useState([]);

  const [searchError, setSearchError] = useState(false);


  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsAktuellesModell(e.target.checked);
  };

  const handleSearch = async () => {
    setLoading(true);
    setSearchError(false);
    try {
      let apiUrl = '/api';

      if (searchModellBezeichnung) {
         apiUrl = appendSearchTerm(apiUrl, 'modellbezeichnung', searchModellBezeichnung);
      }

      if (searchFin) {
        apiUrl = appendSearchTerm(apiUrl, 'fin', searchFin);
      }
  
      if(isAktuellesModell){
        console.log(isAktuellesModell)
        apiUrl = appendSearchTerm(apiUrl, 'istAktuellesModell', isAktuellesModell);
      }

      if(selectedOption){
        console.log(selectedOption)
        apiUrl = appendSearchTerm(apiUrl, 'hersteller', selectedOption);
      }

      if (radioValue) {
        apiUrl = appendSearchTerm(apiUrl, 'getriebeArt', radioValue);
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setAutoData(Array.isArray(data._embedded.autos) ? data._embedded.autos : []);
      console.log(autoData);
      setLoading(false);
      
      setSearchError(false); 

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setSearchError(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setSearchError(false);
      try {
        const response = await fetch('/api'); 
        if (!response.ok) {
          throw new Error('Failed to fetch manufacturers');
        }
        const data = await response.json();
        console.log(data);
        const manufacturers =  [...new Set(data._embedded.autos.map((auto) => auto.hersteller))];
        console.log(manufacturers);
        setManufacturerOptions(manufacturers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
        setLoading(false);
       
      }
    }

    fetchData();
  }, []);


  function appendSearchTerm(apiUrl, searchTerm, searchValue) {
    if (searchValue) {
      apiUrl += `${apiUrl.includes('?') ? '&' : '?'}${searchTerm}=${searchValue}`;
    }
    return apiUrl;
  }


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
              value={searchModellBezeichnung}
              onChange={(e) => setSearchModellBezeichnung(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Fin"
              variant="outlined"
              fullWidth
              value={searchFin}
              onChange={(e) => setSearchFin(e.target.value)}
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
                {manufacturerOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={1.9}>
          <FormControlLabel
        control={
          <Checkbox
            checked={isAktuellesModell}
            onChange={handleCheckboxChange}
            color="primary" // Customize the color if needed
          />
        }
        label="ist aktuelles Modell"
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
              <FormControlLabel value="MANUELL" control={<Radio />} label="Manuell" />
              <FormControlLabel value="AUTOMATIK" control={<Radio />} label="Automatik" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" startIcon={<Search  />} onClick={handleSearch} style={{ marginBottom: '20px' }}>
              Suche
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : searchError ? (
        <Typography>Keine Autos gefunden.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Modellbezeichnung</TableCell>
                <TableCell>Fin</TableCell>
                <TableCell>Hersteller</TableCell>
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
                  <TableCell>{auto.istAktuellesModell ? <Check /> : <Close />}</TableCell>
                  <TableCell>{auto.getriebeArt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
       </Grid>
       </Grid>
      </form>
    </div>
  );
};

export default AutoSuche;
