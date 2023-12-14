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
  IconButton,
} from '@mui/material';
import { Check, Close, Search, Delete   } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import FormHelperText from '@mui/material/FormHelperText';

const AutoSuche = () => {
  const [autoData, setAutoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchModellBezeichnung, setSearchModellBezeichnung] = useState('');
  const [searchEigentuemerBezeichnung, setSearchEigentzemerBezeichnung] = useState('');

  const [searchFin, setSearchFin] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isAktuellesModell, setIsAktuellesModell] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [manufacturerOptions, setManufacturerOptions] = useState([]);

  const [searchError, setSearchError] = useState(false);

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate('/details/${id}');
  };


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

      
      if (searchEigentuemerBezeichnung) {
        apiUrl = appendSearchTerm(apiUrl, 'eigentuemer', searchEigentuemerBezeichnung);
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

  const autoDataWithUniqueId = autoData.map((auto, idx) => ({
    ...auto,
    uniqueId: `row_${idx}`, 
  }));

  return (
    <div>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom >
                Suchformular
              </Typography>
            </Grid>
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
              helperText={
                <FormHelperText style={{ color: 'red' }}>
                  {searchFin.length !== 17 && searchFin !== '' ? "Die FIN muss genau 17 Zeichen haben" : ""}
                </FormHelperText>
              }
              style={{ marginBottom: '20px' }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              label="Eigentuemer"
              placeholder="Den Eigentuemer oder einen Teil davon"
              variant="outlined"
              fullWidth
              value={searchEigentuemerBezeichnung}
              onChange={(e) => setSearchEigentzemerBezeichnung(e.target.value)}
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
            color="primary"
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
  
       </Grid>

       <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={autoDataWithUniqueId}
          getRowId={(row) => row.uniqueId}
          columns={[
            { field: 'modellbezeichnung', headerName: 'Modellbezeichnung', flex: 1 },
            { field: 'fin', headerName: 'Fin', flex: 1 },
            { 
              field: 'eigentuemer', 
              headerName: 'Eigentuemer', 
              flex: 1, 
              renderCell: (params) => (
                params.value?.eigentuemer 
              )
            },
            { field: 'hersteller', headerName: 'Hersteller', flex: 1 },
            { field: 'istAktuellesModell', headerName: 'ist aktuelles Modell', flex: 1, renderCell: (params) => (
                params.value ? <Check /> : <Close />
              )},
            { field: 'getriebeArt', headerName: 'Getriebeart', flex: 1 },
            {
              field: 'actions',
              headerName: 'Actions',
              flex: 1,
              renderCell: (params) => (
                <IconButton aria-label="delete" onClick={() => handleRowClick(params.row.uniqueId)}>
                  <Delete />
                </IconButton>
              ),
            },
          ]}
        />
      </div>



      </form>
    </div>
  );
};

export default AutoSuche;
