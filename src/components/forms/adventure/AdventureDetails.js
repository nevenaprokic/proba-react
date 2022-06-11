import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ThemeProvider } from '@emotion/react';
import { Button } from '@mui/material';
import { createTheme } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { getRoleFromToken } from '../../../app/jwtTokenUtils';
import ReservationForm from '../reservations/ReservationForm';
import Modal from '@mui/material/Modal';
import QuickActionBox from '../../profilePages/cottageProfile/QuickActionBox';
import { isAllowedToMakeReservation } from '../../../services/ClientService';
import { userType } from "../../../app/Enum";
import { subscribe, unsubscribe, isSubscribed } from "../../../services/ClientService";

function AdventureDetails({adventure}){
    const [canReserve, setCanReserve] = useState();

    const [subscribed, setSubscribed] = useState(false);

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
     

    const [adventureData, setAdventureData] = useState();
    const [openReserve, setOpenReserve] = useState(false);

    const handleOpenReserve = () => setOpenReserve(true);
    const handleCloseReserve = () => setOpenReserve(false);

    const [openActions, setOpenActions] = useState(false);

    const handleOpenActions = () => setOpenActions(true);
    const handleCloseActions = () => setOpenActions(false);

    function handleSubscribe(){
        setSubscribed(!subscribed);
        if(subscribed){
          unsubscribe(adventureData.id);
        }else{
          subscribe(adventureData.id);
        }
      };

    useEffect(() => {
        isAllowedToMakeReservation(setCanReserve);
        if(getRoleFromToken() == userType.CLIENT){ isSubscribed(adventure.id, setSubscribed); }
        setAdventureData(adventure);
    }, []);

    useEffect(() => {
        console.log(subscribed);
      }, [subscribed]);    

      
    return(
        (adventureData) &&
        <div className="adventureDetailsContainer">
            <ThemeProvider theme={theme}>
                <Grid item xs={12} md={10}>
                    <Card sx={{ display: 'flex', minWidth:"31vw", border:"solid thin #CC7351" }}>
                    <CardContent sx={{ flex: 1, minWidth:"70%" }}>
                        <div>
                            <div className="headerItem">
                                <Typography component="h2" variant="h5">
                                {adventure.offerName}
                                </Typography>
                            </div>
                        </div>
                        
                        <Typography variant="subtitle1" color="text.secondary">
                            Description: {adventure.description}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            <br/>
                            <HomeIcon style={{ verticalAlign: '-5', color:"action" }} /> Street: {adventure.street} <br />
                            <HomeIcon style={{ verticalAlign: '-5', color:"action" }} /> City: {adventure.city} <br />
                            <HomeIcon style={{ verticalAlign: '-5', color:"action" }} /> State: {adventure.state}
                        </Typography>
                        <div>
                            <div className="personNumLabel">
                                <PersonOutlineIcon style={theme.secondary}></PersonOutlineIcon>
                            </div>
                            <div className="personNumLabel">
                                <Typography variant="subtitle1" paragraph>
                                    Persons: {adventure.peopleNum}
                                </Typography>
                            </div>
                        </div>
                    
                        <Typography variant="subtitle1" paragraph>
                        Rules: {adventure.rulesOfConduct}
                        </Typography>
                        
                        <Typography variant="subtitle1" color="secondary" sx={{fontWeight: "bold"}}>
                            <br></br>
                            <div style={{ marginBottom: '1vh' }}>Price: {adventure.price}€</div>
                            <br></br>

                        <Button
                            className="bookingButton"
                            size="small"
                            variant="contained"
                            bgcolor="secondary"
                            color="secondary"
                            onClick={() => handleOpenActions() }
                            >
                            Special
                        </Button>
                        { getRoleFromToken() != null && 
                        <>                           
                            <Button
                                className="bookingButton"
                                size="small"
                                variant="contained"
                                bgcolor="secondary"
                                color="primary"
                                onClick={handleSubscribe}
                            >
                            { (subscribed) ? "Unsubscribe" : "Subscribe"}
                            </Button>

                            <Button
                                className="bookingButton"
                                size="small"
                                variant="contained"
                                bgcolor="secondary"
                                color="primary"
                                disabled={!canReserve}
                                onClick={() => handleOpenReserve() }
                            >
                                Book
                            </Button>
                            </>
                        }

                        <Modal
                            open={openReserve}
                            onClose={handleCloseReserve}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            sx={{backgroundColor:"rgb(218, 224, 210, 0.6)", overflow:"auto"}}
                        >
                                <ReservationForm offer={adventure} close={handleCloseReserve} />

                        </Modal>

                        <Modal
                            open={openActions}
                            onClose={handleCloseActions}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            sx={{backgroundColor:"rgb(218, 224, 210, 0.6)", overflow:"auto"}}
                        >
                                 <div className="formContainer">
                                    <QuickActionBox offer={adventure}/>
                                 </div>

                        </Modal>

                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: "35%", display: { xs: 'none', sm: 'block' } }}
                        image= { "data:image/jpg;base64," + adventure.photos[0]}
                    />
                    </Card>
                </Grid>
            </ThemeProvider>
            </div>
    );
}

export default AdventureDetails;