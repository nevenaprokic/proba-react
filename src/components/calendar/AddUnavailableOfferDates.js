import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import "../../style/ReservationForm.scss";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { addOffersUnavailableDates } from "../../services/CalendarService";

function AddUnavailableOfferDates({
  offerId,
  offerName,
  selectedDates,
  close,
}) {
  const [startValue, setStartValue] = React.useState(selectedDates.start);
  const [endValue, setEndValue] = React.useState(selectedDates.end);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#99A799",
      },
      secondary: {
        main: "#99A799",
      },
    },
  });

  function handleChangeStartValue(date, keyboardInputValue) {
    setStartValue(keyboardInputValue);
  }

  const handleChangeEndValue = (newValue) => {
    console.log("aa", newValue);
    setEndValue(newValue);
  };

  const handleSubmit = (e) => {
    let success = addOffersUnavailableDates(offerId, selectedDates);
    close();
  };

  if (!!offerId) {
    return (
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="formContainer">
            <Typography variant="h6" gutterBottom>
              Add new unavailabel dates for "{offerName}"
            </Typography>
            <Grid
              container
              spacing={3}
              component="form"
              noValidate
              sx={{ marginTop: "2%" }}
            >
              <Grid item xs={12} sm={6}>
                <div className="dateItem">
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "#99A799" }}
                  >
                    Start date:
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#5f6d5f" }}
                  >
                    {selectedDates.startStr}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="dateItem">
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "#99A799" }}
                  >
                    End date:
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#5f6d5f" }}
                  >
                    {selectedDates.endStr}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ marginLeft: "40%" }}>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ float: "right" }}
                  color={theme.primary}
                  fullWidth
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ marginLeft: "5%" }}>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ float: "right" }}
                  color={theme.primary}
                  fullWidth
                  onClick={close}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className="formContainer">
          <Typography variant="h6" gutterBottom>
            You have not selected the offer for which you want to define
            unavailable dates. Please select the offer.
          </Typography>

          <Grid item sx={{ marginLeft: "45%", width: "10%" }}>
            <br />
            <Button
              type="submit"
              variant="contained"
              sx={{ float: "right" }}
              color={theme.primary}
              fullWidth
              onClick={close}
            >
              Ok
            </Button>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

export default AddUnavailableOfferDates;
