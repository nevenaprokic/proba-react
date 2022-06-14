import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { createTheme } from "@mui/material";
import "./WorkingCalendar.scss";
import { useEffect, useState } from "react";
import { getReservationDetails } from "../../services/CalendarService";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Modal } from "@mui/material";
import ConciseClientProfile from "../profilePages/userProfile/ConciseClientProfile";

function ReservationDetails({ reservationId, setReservationId, close }) {
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

  const [reservationData, setReservationData] = useState();
  const [openClientProfile, setOpenCLientProfile] = useState(false);

  function handleOpenClientProfile() {
    setOpenCLientProfile(true);
  }

  function handleCloseClientProfile() {
    setOpenCLientProfile(false);
  }

  useEffect(() => {
    async function set() {
      if (!!reservationId) {
        const reservation = await getReservationDetails(reservationId);
        setReservationData(reservation.data ? reservation.data : {});
        return reservation;
      }
    }
    set();
  }, []);

  function writeAdditionalServices() {
    let services = "";
    reservationData.additionalServices.forEach((element) => {
      services += element.serviceName + ", ";
    });
    return services.substring(0, services.length - 2);
  }

  if (!!reservationData) {
    return (
      <div className="reservationDetailsContainer">
        <ThemeProvider theme={theme}>
          <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <div>
                    <div className="headerItem">
                      <Typography component="h2" variant="h5">
                        {reservationData.offerName}
                      </Typography>
                    </div>
                    <div className="closeBtn">
                      <Button size="large" onClick={() => close()} sx={{}}>
                        x
                      </Button>
                    </div>
                  </div>

                  <Typography variant="subtitle1" color="text.secondary">
                    {reservationData.startDate} - {reservationData.endDate}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    client: {reservationData.clienName}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => handleOpenClientProfile()}
                  >
                    View client profile
                  </Button>

                  <div>
                    <br />
                    <div className="personNumLabel">
                      <PersonOutlineIcon
                        style={theme.secondary}
                      ></PersonOutlineIcon>
                    </div>
                    <div className="personNumLabel">
                      <Typography variant="subtitle1" paragraph>
                        {reservationData.numberOfPerson}
                      </Typography>
                    </div>
                  </div>

                  <Typography variant="subtitle1" paragraph>
                    additional services: {writeAdditionalServices()}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Price: {reservationData.price} €
                  </Typography>

                  <Modal
                    open={openClientProfile}
                    onClose={handleCloseClientProfile}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                      backgroundColor: "rgb(218, 224, 210, 0.6)",
                      overflow: "auto",
                    }}
                  >
                    <ConciseClientProfile
                      closeModal={handleCloseClientProfile}
                      clientEmail={reservationData.clientEmail}
                    />
                  </Modal>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                  image={"data:image/jpg;base64," + reservationData.offerPhoto}
                />
              </Card>
            </CardActionArea>
          </Grid>
        </ThemeProvider>
      </div>
    );
  } else return null;
}

export default ReservationDetails;
