import * as React from "react";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { searchCottagesClient } from "../../../services/CottageService";
import { searchShipsClient } from "../../../services/ShipService";
import { offerType } from "../../../app/Enum";
import { searchInstructorsClient } from "../../../services/InstructorService";

export default function ClientSearch({
  params,
  setParams,
  type,
  setOffers,
  setLastSearchedOffers,
}) {
  const [valueDate, setValueDate] = React.useState();

  const handleChangeDate = (newValue) => {
    // newValue = newValue.toLocaleDateString("en-US");
    setValueDate(newValue);
    setParams({ ...params, date: newValue });
  };

  const handleSubmit = () => {
    searchOffer[type](params, setOffers, setLastSearchedOffers);
  };

  let searchOffer = {
    [offerType.COTTAGE]: searchCottagesClient,
    [offerType.SHIP]: searchShipsClient,
    [offerType.ADVENTURE]: searchInstructorsClient,
  };

  useEffect(() => {
    let tommotowDate = new Date();
    tommotowDate.setDate(tommotowDate.getDate() + 1);
    setValueDate(tommotowDate);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={5}>
        <Grid item xs>
          {type == offerType.ADVENTURE ? (
            <TextField
              id="firstName"
              label="First Name"
              onChange={(event) => {
                setParams({ ...params, firstName: event.target.value });
              }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          ) : (
            <TextField
              id="name"
              label="Name"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setParams({ ...params, name: event.target.value });
              }}
            />
          )}
        </Grid>

        <Grid item xs>
          {type == offerType.ADVENTURE ? (
            <TextField
              id="lastName"
              label="Last Name"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setParams({ ...params, lastName: event.target.value });
              }}
            />
          ) : (
            <TextField
              id="description"
              label="Description"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setParams({ ...params, description: event.target.value });
              }}
            />
          )}
        </Grid>

        <Grid item xs>
          <TextField
            id="address"
            label="Address"
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setParams({ ...params, address: event.target.value });
            }}
          />
        </Grid>
        <Grid item>
          <DesktopDatePicker
            label="Date"
            inputFormat="dd/MM/yyyy"
            value={valueDate}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs>
          <Button size="large" sx={{}} onClick={() => handleSubmit()}>
            Search
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
