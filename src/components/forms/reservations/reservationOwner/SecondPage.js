import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import BoyIcon from "@mui/icons-material/Boy";
import AdditionalServices from "../../addtitionaServices/AdditionalServices";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "../../../../style/ReservationForm.scss";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NumbersIcon from "@mui/icons-material/Numbers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function SecondPage({
  setReservation,
  reservation,
  offers,
  checked,
  setChecked,
}) {
  const [valueReservation, setValueReservation] = React.useState(new Date());
  let currentOffer = offers.find((offer) => offer.id === reservation.offerId);

  const handleChangePeopleNum = (e) => {
    setReservation((prevState) => {
      return { ...prevState, peopleNum: e.target.value };
    });
  };

  const handleChangeReservationDate = (newValue) => {
    let month = newValue.getMonth() + 1;
    let day = newValue.getDate();
    if (month.toString().length === 1) month = "0" + month;
    if (day.toString().length === 1) day = "0" + day;
    let date = newValue.getFullYear() + "-" + month + "-" + day;
    setValueReservation(newValue);
    setReservation((prevState) => {
      return { ...prevState, startDateReservation: date };
    });
  };

  const handleChangeNumberReservation = (e) => {
    setReservation((prevState) => {
      return { ...prevState, daysReservation: e.target.value };
    });
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <label
              style={{
                marginLeft: "20%",
                marginBottom: "5%",
                color: "#CC7351",
                fontSize: "25px",
              }}
            >
              {"The reservation offer is " + reservation.offerName + "."}
            </label>
          </Grid>
          <Grid item xs={12} sm={4}>
            <DesktopDatePicker
              label="Starting date*"
              inputFormat="yyyy-MM-dd"
              value={valueReservation}
              required
              onChange={handleChangeReservationDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="daysReservation"
              name="second"
              label="Number of days"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              onChange={handleChangeNumberReservation}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Number of guests"
              id="guests"
              type="number"
              required
              onChange={handleChangePeopleNum}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BoyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <label
              style={{ marginBottom: "5%", color: "#CC7351", fontSize: "23px" }}
            >
              {"Basic price:  " + reservation.price + "€"}
            </label>
            <br></br>
            <label
              style={{ marginBottom: "5%", color: "#CC7351", fontSize: "15px" }}
            >
              {"Choose additional services!"}
            </label>
          </Grid>
          <Grid item xs={12}>
            {currentOffer.additionalServices.length == 0 ? (
              <Typography variant="h6" gutterBottom color="#CC7351">
                No additional services{" "}
                <ClearIcon style={{ verticalAlign: "-6", color: "#CC7351" }} />
              </Typography>
            ) : (
              <>
                <Typography variant="h7" gutterBottom color="#CC7351">
                  Additional services{" "}
                  <AddCircleIcon
                    style={{ verticalAlign: "-6", color: "#CC7351" }}
                  />
                </Typography>

                <List sx={{ width: "60%", bgcolor: "background.paper" }}>
                  {currentOffer.additionalServices.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem
                        key={value.name + currentOffer.id}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="comments"
                          ></IconButton>
                        }
                        disablePadding
                      >
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(value)}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            secondary={`${value.serviceName}`}
                          />
                          <ListItemText
                            className="list-item"
                            id={labelId}
                            primary={` ${value.servicePrice}€`}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
          </Grid>
        </Grid>
      </LocalizationProvider>
    </React.Fragment>
  );
}
