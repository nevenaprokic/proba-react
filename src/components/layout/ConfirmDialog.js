import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../style/ConfirmDialog.scss";
import { useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import ButtonGroup from '@mui/material/ButtonGroup';
import { getUsernameFromToken } from "../../app/jwtTokenUtils";
import api from "../../app/api"; 
import { arrayToDateString } from "../../services/UtilService";

export default function ConfirmDialog({ close, cb, actionData, offerData }) {
  
  const [reservationData, setReservationData] = useState();
  const [clientData, setClientData] = useState();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#5f6d5f",
      },
      secondary: {
        main: "#CC7351",
      },
    },
  });

  const onConfirm = (data) => {
    cb();
  };

  const onClose = (data) => {
    close();
  };

  useEffect(() => {
    async function setData() {
      const request = await api.get(
        "client/profile-info/" + getUsernameFromToken()
      ).catch(() => { console.log("Doslo je do greske kod dobavljanja podataka o klijentu."); });
      setClientData(request ? request.data : null);
    }
    setData();
    setReservationData(actionData);
  }, []);

  function writeAdditionalServices(){
    let services = ""
    if(reservationData.additionalServices.length == 0) return "No additional services."
    reservationData.additionalServices.forEach(element => {
        services += element.serviceName + ", "
    });
    return services.substring(0, services.length - 2);
};
  
return(
    (reservationData && clientData) &&
    <div className="reservationDetailsContainer">
    <ThemeProvider theme={theme}>
        <Grid item xs={12} md={10}>
        <CardActionArea component="a" href="#">
            <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
                <div>
                    <div className="headerItem">
                        <Typography component="h2" variant="h5">
                        {offerData.name}
                        </Typography>
                    </div>
                    <div className="closeBtn">
                        <Button size="large" onClick={() => close()} sx={{}}>
                        x
                        </Button>
                    </div>
                </div>
                
                <Typography variant="subtitle1" color="text.secondary">
                  {arrayToDateString(reservationData.startDate).toLocaleDateString("en-US")} - {arrayToDateString(reservationData.endDate).toLocaleDateString("en-US")}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    Client: {clientData.firstName} {clientData.lastName}
                </Typography>
                <div>
                    <div className="personNumLabel">
                        <PersonOutlineIcon style={theme.secondary}></PersonOutlineIcon>
                    </div>
                    <div className="personNumLabel">
                        <Typography variant="subtitle1" paragraph>
                            {reservationData.numberOfPerson}
                        </Typography>
                    </div>
                </div>
               
                <Typography variant="subtitle1" paragraph>
                  Additional services: <br></br>{writeAdditionalServices()}
                </Typography>
                
                <Typography variant="subtitle1" color="secondary" sx={{fontWeight: "bold"}}>
                    Price: {reservationData.price} €
                </Typography>
                <ButtonGroup className="buttons" disableElevation variant="contained">
                  <Button onClick={onConfirm}>Confirm</Button>
                  <Button  onClick={onClose} style={{ backgroundColor: "#CC7351"}}>Close</Button>
              </ButtonGroup>
            </CardContent>
            <CardMedia
                component="img"
                sx={{ width: 250, display: { xs: 'none', sm: 'block' } }}
                image= { "data:image/jpg;base64," +   offerData.photos[0]}
                //alt={post.imageLabel}
            />
            </Card>
        </CardActionArea>
        </Grid>
    </ThemeProvider>
    </div>
);
}
