import "./OwnerProfile.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import profileIcon from "../../images/profile.png";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BasicInfoBox from "./BasicInfoBox";
import AddressInfoBox from "./AddressInfoBox";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  getUsernameFromToken,
  getRoleFromToken,
} from "../../../app/jwtTokenUtils";
import { getShipOwnerByUsername } from "../../../services/ShipOwnerService";
import { useState, useEffect } from "react";
import ChangeOwnerData from "../../forms/user/ChangeOwnerData";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { userType } from "../../../app/Enum";
import { getInstructorByUsername } from "../../../services/InstructorService";
import { getCottageOwnerByUsername } from "../../../services/CottageOwnerService";
import AdditionalInfoBox from "./AdditionalInfoBox";
import ChangePassword from "../../forms/user/ChangePassword";
import DeleteOrderOwner from "../../forms/user/DeleteOrderOwner";

function OwnerProfile() {
  const [ownerData, setOwnerData] = useState();
  const [open, setOpen] = useState(false);
  const [openPasswordManager, setPasswordManager] = useState(false);

  const handleOpenPass = () => setPasswordManager(true);
  const handleClosePass = () => setPasswordManager(false);

  const [openDeleteManager, setDeleteManager] = useState(false);

  const handleOpenDelete = () => setDeleteManager(true);
  const handleCloseDelete = () => setDeleteManager(false);

  let getOfferByOwnerEmail = {
    [userType.COTTAGE_OWNER]: getCottageOwnerByUsername,
    [userType.INSTRUCTOR]: getInstructorByUsername,
    [userType.SHIP_OWNER]: getShipOwnerByUsername,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const childToParent = (childData) => {
    if (getRoleFromToken() === userType.INSTRUCTOR) {
      setOwnerData((prevState) => ({
        ...prevState,
        ["firstName"]: childData.firstName,
        ["lastName"]: childData.lastName,
        ["phoneNumber"]: childData.phoneNumber,
        ["city"]: childData.city,
        ["street"]: childData.street,
        ["state"]: childData.state,
        ["biography"]: childData.biography,
      }));
    } else {
      setOwnerData((prevState) => ({
        ...prevState,
        ["firstName"]: childData.firstName,
        ["lastName"]: childData.lastName,
        ["phoneNumber"]: childData.phoneNumber,
        ["city"]: childData.city,
        ["street"]: childData.street,
        ["state"]: childData.state,
      }));
    }
  };

  useEffect(() => {
    async function setData() {
      let requestData = null;
      let username = getUsernameFromToken();
      let role = getRoleFromToken();
      requestData = await getOfferByOwnerEmail[role](username);
      setOwnerData(!!requestData ? requestData.data : {});

      return requestData;
    }
    setData();
  }, []);

  if (!!ownerData) {
    return (
      <div className={"ownerprofileContainer"}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", width: "40vw", marginLeft: "10%" }}
        >
          <CssBaseline />
          <Grid item xs={12} sm={5}>
            <img src={profileIcon} width="60%"></img>
          </Grid>

          <BasicInfoBox basicData={ownerData}></BasicInfoBox>

          <Grid item xs={12} sm={1}>
            <LockIcon />
            <br />
            <br />
            <SettingsIcon />
            <br />
            <br />
            <DeleteIcon />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography>
              <Button
                size="small"
                sx={{ backgroundColor: "#99A799", color: "black" }}
                onClick={handleOpenPass}
              >
                {" "}
                Change password
              </Button>
              <br />
              <br />
              <Button
                size="small"
                sx={{ backgroundColor: "#99A799", color: "black" }}
                onClick={handleOpen}
              >
                {" "}
                Change private data
              </Button>
              <br />
              <br />
              <Button
                size="small"
                sx={{ backgroundColor: "#99A799", color: "black" }}
                onClick={handleOpenDelete}
              >
                {" "}
                Delete profile
              </Button>
            </Typography>
          </Grid>
          <Modal
            open={openPasswordManager}
            onClose={handleClosePass}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)" }}
          >
            <ChangePassword close={handleClosePass} />
          </Modal>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)" }}
          >
            <ChangeOwnerData
              currentOwnerData={ownerData}
              close={handleClose}
              childToParent={childToParent}
            />
          </Modal>
          <Modal
            open={openDeleteManager}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)" }}
          >
            <DeleteOrderOwner close={handleCloseDelete} />
          </Modal>

          <AddressInfoBox addressData={ownerData} />
          <Grid xs={12} sm={5} />
          <AdditionalInfoBox additionalDate={ownerData} />

          <Grid xs={8} sm={8} />
        </Grid>
      </div>
    );
  } else return null;
}

export default OwnerProfile;
