import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { userType } from "../../../../app/Enum";

export default function FirstPage({ clients, setReservation, offers, role }) {
  const handlerOfferChange = (event, selectedOffer) => {
    let email = selectedOffer.split("-")[0];
    let currentClient = clients.find((client) => client.email === email);
    setReservation((prevState) => {
      return {
        ...prevState,
        clientUserName: currentClient.email,
        clientName: currentClient.firstName,
        clientLastName: currentClient.lastName,
        discount: currentClient.discount,
      };
    });
    let currentOffer = offers.find(
      (offer) => offer.id === currentClient.offerId
    );

    if (role === userType.INSTRUCTOR)
      setReservation((prevState) => {
        return {
          ...prevState,
          offerName: currentOffer.offerName,
          offerId: currentOffer.id,
        };
      });
    else {
      setReservation((prevState) => {
        return {
          ...prevState,
          offerName: currentOffer.name,
          offerId: currentOffer.id,
          price: currentOffer.price,
        };
      });
    }
  };

  if (!!clients) {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <label
            style={{ marginLeft: "15%", color: "#CC7351", fontSize: "25px" }}
          >
            Clients who currently have a reservation with you.
          </label>
          <br />
          <label
            style={{ marginLeft: "40%", color: "#CC7351", fontSize: "20px" }}
          >
            Please select!
          </label>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={clients.map(
                (client) =>
                  client.email + "-" + client.firstName + " " + client.lastName
              )}
              required
              sx={{ width: 300, marginLeft: "30%", marginTop: "4%" }}
              onChange={(event, newValue) => {
                handlerOfferChange(event, newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Client*" />
              )}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else return null;
}
