import * as React from "react";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  searchCottages,
  searchCottagesByCottageOwner,
} from "../../../services/CottageService";
import {
  searchShips,
  searchShipByShipOwner,
} from "../../../services/ShipService";
import { offerType } from "../../../app/Enum";
import { searchInstructors } from "../../../services/InstructorService";
import { searchAdventureByInstructor } from "../../../services/AdventureService";

export default function Search({ params, setParams, type, setOffers, setSearchMood }) {
  const [error, setError] = useState("");


  const handleChange = (event) => {
    let {
      target: { value },
    } = event;
    let reg = new RegExp(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    ).test(value);
    if (!reg && event.target.value != "") {
      setError("Wrong format for phone number");
    } else {
      setError("");
      setParams({ ...params, phoneNumber: event.target.value });
    }
  };
  
  let searchOffer = {
    [offerType.COTTAGE]: searchCottages,
    [offerType.SHIP]: searchShips,
    [offerType.ADVENTURE]: searchInstructors,
    [offerType.COTTAGE_OWNER]: searchCottagesByCottageOwner,
    [offerType.SHIP_OWNER]: searchShipByShipOwner,
    [offerType.INSTRUCTOR]: searchAdventureByInstructor,
  };

  return (
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
            fullWidth
            label="Max Price"
            id="price"
            type="number"
            onChange={(event) => {
              setParams({ ...params, price: event.target.value });
            }}
            InputProps={{
              startAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
          />
        )}
      </Grid>

      <Grid item xs>
        {type == offerType.ADVENTURE ? (
          <>
            <TextField
              id="phoneNumber"
              label="Phone Number"
              onChange={(event) => { setParams({ ...params, phoneNumber: event.target.value }); }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            {error != "" && (
              <p style={{ color: "#ED6663" }}>Please check the phone number</p>
            )}
          </>
        ) : (
          <TextField
            id="peopleNum"
            label="Maximum number of people"
            type="number"
            onChange={(event) => {
              setParams({ ...params, maxPeople: event.target.value });
            }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
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
      {console.log(type)}

      <Grid item xs>
        <Button
          size="large"
          sx={{}}
          onClick={() => searchOffer[type](params, setOffers, setSearchMood)}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
