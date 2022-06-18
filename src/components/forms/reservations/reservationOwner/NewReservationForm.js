import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import Review from "./Review";
import { userType } from "../../../../app/Enum";
import { useEffect, useState } from "react";
import { getCottageByCottageOwnerEmail } from "../../../../services/CottageService";
import {
  getRoleFromToken,
  getUsernameFromToken,
} from "../../../../app/jwtTokenUtils";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAdventureByInstructorEmail } from "../../../../services/AdventureService";
import { getShipByShipOwnerEmail } from "../../../../services/ShipService";
import {
  getClientByCottageOwnerEmail,
  getClientByShipOwnerEmail,
  getClientByInstructorEmail,
  isAvailableClient,
} from "../../../../services/ClientService";
import { makeReservationOwner } from "../../../../services/ReservationService";
import { isAvailablePeriod } from "../../../../services/QuickActionService";
import { isAvailableOffer } from "../../../../services/ReservationService";
import { addDaysToLocalDate } from "../../../../services/UtilService";

const steps = [
  "Selection of clients",
  "Selection of additional attributes",
  "Review your reservation",
];

const theme = createTheme({
  palette: {
    primary: { main: "#ADC2A9" },
    secondary: { main: "#ffffff" },
  },
});

const regex = new RegExp("^[1-9]+[0-9]*$");
function checkFirstPage(reservation) {
  if (reservation.clientUserName === "") {
    toast.error("Client email is required", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    return false;
  }
  return true;
}
function checkSecondPage(reservation, num) {
  let startDateReservation = new Date(reservation.startDateReservation);
  const currentDate = new Date();
  if (startDateReservation <= currentDate) {
    toast.error("Invalid date, try again!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    return false;
  }
  if (reservation.peopleNum > num) {
    toast.error(
      "The number of guests must be less than expected (" + num + ").",
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      }
    );
    return false;
  }
  if (!regex.test(reservation.daysReservation)) {
    toast.error(
      "The number of days for the reservation are required and must be a number!",
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      }
    );
    return false;
  }
  if (!regex.test(reservation.peopleNum)) {
    toast.error("The number of people are required and must be a number!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    return false;
  }
  return true;
}

export default function NewReservationForm({ offers, setOffers }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [reservation, setReservation] = React.useState({
    clientUserName: "",
    clientName: "",
    clientLastName: "",
    offerName: "",
    offerId: 0,
    daysReservation: 0,
    startDateReservation: "",
    peopleNum: 0,
    price: 0,
    discount: 0,
  });
  const [client, setClient] = React.useState();
  const [checked, setChecked] = React.useState([]);

  const handleNext = () => {
    if (activeStep == 0) {
      if (checkFirstPage(reservation)) {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep == 1) {
      let currentOffer = offers.find(
        (offer) => offer.id === reservation.offerId
      );
      if (checkSecondPage(reservation, currentOffer.numberOfPerson)) {
        checkDateFromBack();
      }
    } else if (activeStep == 2) {
      setActiveStep(activeStep + 1);
      let params = { ...reservation, services: checked };
      makeReservationOwner(params);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function checkDateFromBack() {
    async function setCheck() {
      let checkAvailble = await isAvailableOffer(reservation);
      let checkPeriod = await isAvailablePeriod(reservation);
      let checkClient = await isAvailableClient(
        reservation.clientUserName,
        new Date(reservation.startDateReservation).toISOString().split("T")[0],
        addDaysToLocalDate(
          reservation.startDateReservation,
          reservation.daysReservation
        )
      );

      if (checkAvailble && checkPeriod && checkClient) {
        setActiveStep(activeStep + 1);
      }
      if (!checkClient) {
        toast.error(
          "In the selected period the client already has a reservation!",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
          }
        );
      }
      if (!checkAvailble) {
        toast.error(
          "The reservation for the selected offer in the selected period already exists!",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
          }
        );
      }
      if (!checkPeriod) {
        toast.error("Offer in the selected period is unavailable!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        });
      }
    }
    setCheck();
  }

  let getOffer = {
    [userType.COTTAGE_OWNER]: getCottageByCottageOwnerEmail,
    [userType.SHIP_OWNER]: getShipByShipOwnerEmail,
    [userType.INSTRUCTOR]: getAdventureByInstructorEmail,
  };
  let getClient = {
    [userType.COTTAGE_OWNER]: getClientByCottageOwnerEmail,
    [userType.SHIP_OWNER]: getClientByShipOwnerEmail,
    [userType.INSTRUCTOR]: getClientByInstructorEmail,
  };
  let role = getRoleFromToken();
  useEffect(() => {
    async function setDataOffer() {
      let role = getRoleFromToken();
      let username = getUsernameFromToken();
      const offersData = await getOffer[role](username);
      setOffers(offersData ? offersData.data : {});
      return offersData;
    }
    async function setDataClient() {
      let role = getRoleFromToken();
      let username = getUsernameFromToken();
      const clientsData = await getClient[role](username);
      setClient(clientsData ? clientsData : {});
      return clientsData;
    }
    setDataClient();
    setDataOffer();
  }, []);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <FirstPage
            clients={client}
            setReservation={setReservation}
            offers={offers}
            role={role}
          />
        );
      case 1:
        return (
          <SecondPage
            setReservation={setReservation}
            reservation={reservation}
            offers={offers}
            checked={checked}
            setChecked={setChecked}
          />
        );
      case 2:
        return <Review reservation={reservation} checked={checked} />;
      default:
        throw new Error("Unknown step");
    }
  }
  if (!!client && !!offers) {
    return (
      <div style={{ width: "70vw" }}>
        <ThemeProvider theme={theme}>
          <Container
            component="main"
            maxWidth="sm"
            sx={{ mb: 4, border: "solid medium #99A799", borderRadius: "20px" }}
          >
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                New reservation for the client
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your new reservation.
                    </Typography>
                    <Typography variant="subtitle1">
                      {"The new reservation will be presented with the '" +
                        reservation.offerName +
                        "' offer. The client " +
                        reservation.clientName +
                        " " +
                        reservation.clientLastName +
                        " will be notified of the new reservation."}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Back
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {activeStep === steps.length - 1 ? "Create" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </Container>
        </ThemeProvider>
      </div>
    );
  } else return null;
}
