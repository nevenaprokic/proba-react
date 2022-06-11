import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '../../layout/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";
import MainNavigation from '../../layout/MainNavigation';


const theme = createTheme({
  palette: {
    primary: { main: "#9DAB86" },
  },
});

export default function Registration(){
    let navigate = useNavigate(); 

    const routeChangeClient = () =>{ 
      console.log("Klijent registracija.");
      let path = `registration-client`; 
      navigate(path);
    }
    
  const routeChangeOwner = () =>{ 
    let path = `registration-owner`; 
    navigate(path);
  }
  return (<Card>
    <ThemeProvider theme={theme}>
      <MainNavigation/>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.parkettkaiser.de/media/catalog/product/p/a/parkettkaiser-skaben-fototapete-natur-palmen-blau-gruen-055811_r.jpg?width=265&height=265&store=eu-en&image-type=image)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
           
            <Typography component="h1" variant="h5">
              Type of user
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
            <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={routeChangeClient}>Client</Button>
                <Button onClick={routeChangeOwner}>Owner</Button>
            </ButtonGroup>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider></Card>
  );
}
