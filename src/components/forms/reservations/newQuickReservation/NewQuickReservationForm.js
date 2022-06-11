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
import { addDays } from "../../../../services/UtilService";
import {
  alreadyExistQuickReservationForOffer,
  isAvailablePeriod,
  makeQuickReservation
} from "../../../../services/QuickActionService";
import { isAvailableOffer } from "../../../../services/ReservationService";
import {getAdventureByInstructorEmail} from '../../../../services/AdventureService';
import {getShipByShipOwnerEmail} from '../../../../services/ShipService';

const steps = [
  "Selection of offers",
  "Selection of additional attributes",
  "Review your quick action",
];

const theme = createTheme({
  palette: {
    primary: { main: "#ADC2A9" },
    secondary: { main: "#ffffff" },
  },
});
const regex = new RegExp("^[1-9]+[0-9]*$");
function checkFirstPage(offer) {
  let startDateAction = new Date(offer.startDateAction);
  let startDateReservation = new Date(offer.startDateReservation);
  let endDateAction = addDays(
    new Date(offer.startDateAction),
    offer.daysAction
  );
  const currentDate = new Date();

  if (offer.name === '') {
    toast.error("Offer name is required", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    return false;
  }
  if (!regex.test(offer.daysAction)) {
    toast.error(
      "The number of days for the action are required and must be a number!",
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      }
    );
    return false;
  }
  if (!regex.test(offer.daysReservation)) {
    toast.error(
      "The number of days for the reservation are required and must be a number!",
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      }
    );
    return false;
  }
  if (startDateAction < currentDate || startDateReservation <= currentDate) {
    toast.error("Invalide date", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    return false;
  }
  if (startDateAction >= startDateReservation) {
    toast.error("Invalide date", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    return false;
  }
  if (endDateAction >= startDateReservation >= startDateAction) {
    toast.error("Invalide date", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    return false;
  }
  return true;
}

function checkSecondPage(offer) {
  if (!regex.test(offer.peopleNum)) {
    toast.error("The number of people are required and must be a number!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    return false;
  }
  if (!regex.test(offer.price)) {
    toast.error("Price is required and must be a number!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    return false;
  }
  return true;
}

export default function Checkout({ offers, setOffers }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [offer, setOffer] = React.useState({
    name: "",
    offerId: 0,
    daysAction: 0,
    daysReservation: 0,
    startDateAction: "",
    startDateReservation: "",
    peopleNum: 0,
    price: 0,

  });
  const [additionalServicesInputList, setInputList] = useState([
    { serviceName: "", servicePrice: "" },
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  function checkDateFromBack() {
    async function setCheck() {
      let checkExist = await alreadyExistQuickReservationForOffer(offer);
      let checkAvailble = await isAvailableOffer(offer);
      let checkPeriod = await isAvailablePeriod(offer);

      if (checkExist && checkAvailble && checkPeriod) {
        setActiveStep(activeStep + 1);
      }
      if (!checkExist) {
        toast.error(
          "A quick reservation for the selected offer in the selected period already exists!",
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

  const handleNext = () => {
    if (activeStep == 0) {
      if (checkFirstPage(offer)) {
        checkDateFromBack();
      }
    } else if (activeStep == 1) {
      if (checkSecondPage(offer)) {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep == 2) {
      setActiveStep(activeStep + 1);
      makeQuickReservation(offer, additionalServicesInputList);
    } 
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  let getOffer = {
    [userType.COTTAGE_OWNER]: getCottageByCottageOwnerEmail,
    [userType.SHIP_OWNER] : getShipByShipOwnerEmail,
    [userType.INSTRUCTOR] : getAdventureByInstructorEmail
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
    setDataOffer();
  }, []);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FirstPage offers={offers} setOffer={setOffer} role={role}/>;
      case 1:
        return (
          <SecondPage
            setOffer={setOffer}
            additionalServicesInputList={additionalServicesInputList}
            setInputList={setInputList}
            register={register}
            errors={errors}
          />
        );
      case 2:
        return (
          <Review
            offer={offer}
            additionalServicesInputList={additionalServicesInputList}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  return (
    !!offers && (
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
                New quick reservation
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
                      Thank you for your new quick reservation.
                    </Typography>
                    <Typography variant="subtitle1">
                      {"The new quick reservation will be presented with the '" +
                        offer.name +
                        "' offer. All subscribed users will be notified of the new action."}
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
    )
  );
}
