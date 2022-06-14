import "./OwnerProfile.scss";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ErrorIcon from "@mui/icons-material/Error";
import CategoryInfoTabel from "./CategoryInfoTabel";
import { userType } from "../../../app/Enum";
import { useState } from "react";
import { Modal } from "@mui/material";
import { IconButton } from "@mui/material";

function AdditionalInfoClientBox({ additionalData }) {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

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
          <label className="boxTitle">Additional information</label>
          <br />
          <br />

          <div>
            <div className="boxItem">
              <IconButton
                aria-label="change"
                sx={{
                  color: "#CC7351",
                  marginTop: 0,
                  marginLeft: 0,
                  width: "25px",
                  height: "12px",
                }}
                onClick={handleOpen}
              >
                <AssessmentIcon />
              </IconButton>
            </div>
            <label className="boxItemTitle">Client category: </label>
            <label className="boxItemText">
              {additionalData.clientCategory.split("_")[0]}
            </label>
          </div>
          <div>
            <div className="boxItem">
              <AssessmentIcon color="action" />
            </div>
            <label className="boxItemTitle">Points from reservation:</label>
            <label className="boxItemText">{additionalData.points}</label>
          </div>
          <div>
            <div className="boxItem">
              <ErrorIcon color="action" />
            </div>
            <label className="boxItemTitle">Penalties: </label>
            <label className="boxItemText">{additionalData.penal}</label>
            {additionalData.penal >= 3 ? (
              <label className="penaltiesText"> Reservations forbidden </label>
            ) : (
              <label className="penaltiesText"> Reservations allowed </label>
            )}
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)", overflow: "auto" }}
        >
          <CategoryInfoTabel categoryType={userType.CLIENT} />
        </Modal>
      </Box>
    </Grid>
  );
}

export default AdditionalInfoClientBox;
