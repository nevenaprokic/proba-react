import "./OwnerProfile.scss";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import HomeIcon from "@mui/icons-material/Home";

function AddressInfoBox({ addressData }) {
  return (
    <Grid
      item
      xs={12}
      sm={7}
      component={Paper}
      elevation={10}
      square
      height={"30%"}
      sx={{ borderRadius: "5%", minHeight: "200px" }}
    >
      <Box className="infoBoxContainer">
        <div className="infoBox">
          <label className="boxTitle">Address</label>
          <br />
          <br />

          <div>
            <div className="boxItem">
              <HomeIcon color="action" />
            </div>
            <label className="boxItemTitle">Street: </label>
            <label className="boxItemText">{addressData.street}</label>
          </div>
          <div>
            <div className="boxItem">
              <HomeIcon color="action" />
            </div>
            <label className="boxItemTitle">City: </label>
            <label className="boxItemText">{addressData.city}</label>
          </div>
          <div>
            <div className="boxItem">
              <HomeIcon color="action" />
            </div>
            <label className="boxItemTitle">State: </label>
            <label className="boxItemText">{addressData.state}</label>
          </div>
        </div>
      </Box>
    </Grid>
  );
}

export default AddressInfoBox;
