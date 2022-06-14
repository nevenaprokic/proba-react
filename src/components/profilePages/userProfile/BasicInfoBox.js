import "./OwnerProfile.scss";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function BasicInfoBox({ basicData }) {
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
          <label className="boxTitle">Basic information</label>
          <br />
          <br />
          <div>
            <div className="boxItem">
              <PersonIcon color="action" />
            </div>
            <label className="boxItemTitle">First name: </label>
            <label className="boxItemText">{basicData.firstName}</label>
          </div>
          <div>
            <div className="boxItem">
              <PersonIcon color="action" />
            </div>
            <label className="boxItemTitle">Last Name: </label>
            <label className="boxItemText">{basicData.lastName}</label>
          </div>
          <div>
            <div className="boxItem">
              <LocalPhoneIcon color="action" />
            </div>
            <label className="boxItemTitle">Phone: </label>
            <label className="boxItemText">{basicData.phoneNumber}</label>
          </div>
        </div>
      </Box>
    </Grid>
  );
}

export default BasicInfoBox;
