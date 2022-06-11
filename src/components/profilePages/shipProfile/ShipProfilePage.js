import "../cottageProfile/CottageProfilePage.scss";
import { Grid, Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { useState, useEffect } from "react";
import QuickActionBox from "../cottageProfile/QuickActionBox";
import BasicShipInfoBox from "./BasicShipInfoBox";
import AdditionalDescriptionBox from "./AdditionalDescriptionBox";
import PriceList from "../cottageProfile/Pricelist";
import ImagesBox from "../cottageProfile/ImagesBox";
import "../../../style/OfferData.scss";
import { getShipById, checkReservation } from "../../../services/ShipService";
import { getRoleFromToken } from "../../../app/jwtTokenUtils";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import { userType } from "../../../app/Enum";
import Modal from "@mui/material/Modal";
import DeleteShip from "../../forms/ship/DeleteShip";
import { toast } from "react-toastify";
import MapBox from "../cottageProfile/MapBox";
import ChangeShipForm from "../../forms/ship/ChangeShipForm";
import { isSubscribed, subscribe, unsubscribe } from "../../../services/ClientService";
import ImagesGallery from "../../layout/ImageGallery";

const theme = createTheme({
  palette: {
    primary: {
      main: "#99A799",
    },
    secondary: {
      main: "#ADC2A9",
    },
  },
});

function ShipProfilePage({ id, close, childToParentMediaCard }) {
  const [shipData, setShipData] = useState();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openChangeForm, setOpenForm] = useState(false);

  const [subscribed, setSubscribed] = useState();

  const handleOpenForm = () => {
    checkAllowed(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenDeleteDialog = () => {
    checkAllowed(false);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDialog(false);
  };

  async function checkAllowed(operation) {
    let allowed = await checkReservation(shipData);
    if (allowed) {
      if (operation) setOpenForm(true);
      else setOpenDialog(true);
    } else {
      let message = "Delete is not allowed because this ship has reservations.";
      if (operation)
        message = "Update is not allowed because this ship has reservations.";
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    }
  }
  const childToParent = (childData) => {
    setShipData((prevState) => ({
      ...prevState,
      ["name"]: childData.name,
      ["price"]: childData.price,
      ["id"]: childData.id,
      ["city"]: childData.city,
      ["street"]: childData.street,
      ["state"]: childData.state,
      ["description"]: childData.description,
      ["rulesOfConduct"]: childData.rulesOfConduct,
      ["cancellationConditions"]: childData.cancellationConditions,
      ["numberOfPerson"]: childData.numberOfPerson,
      ["additionalServices"]: childData.additionalServices,
      ["photos"]: childData.photos,
      ["type"]: childData.type,
      ["size"]: childData.size,
      ["motorNumber"]: childData.motorNumber,
      ["motorPower"]: childData.motorPower,
      ["maxSpeed"]: childData.maxSpeed,
      ["navigationEquipment"]: childData.navigationEquipment,
      ["additionalEquipment"]: childData.additionalEquipment,
    }));

    childToParentMediaCard(childData);
  };

  useEffect(() => {
    if(getRoleFromToken() == userType.CLIENT){ isSubscribed(id, setSubscribed); }
    async function setData() {
      let ship = await getShipById(id);
      setShipData(!!ship ? ship.data : {});

      return ship;
    }
    setData();
  }, []);

  useEffect(() => {
  }, [subscribed]);

  function createServiceData() {
    let rows = [];
    shipData.additionalServices.forEach((data) => {
      let name = data.serviceName;
      let price = data.servicePrice;
      rows.push({ name, price });
    });
    return rows;
  }

  function handleSubscribe(){
    setSubscribed(!subscribed);
    if(subscribed){
      unsubscribe(shipData.id);
    }else{
      subscribe(shipData.id);
    }
  }

  let photos = [];
  if (shipData) {
    shipData.photos.forEach((photo) => {
      let imag = { image: "data:image/jpg;base64," + photo };
      photos.push(imag);
    });
    return (
      <div className="changeDataContainer" id="changeDataContainer">
        <ThemeProvider theme={theme}>
          <div className="profileContainer">
            <div className="closeProfileBtn">
              <Button size="large" sx={{}} onClick={() => close()}>
                x
              </Button>
            </div>
            <div className="headerContainer">
              <h2 className="adventureTittle">{shipData.name}</h2>
              <Divider />
              <div className="mark">
                <Rating
                  name="half-rating-read"
                  precision={0.5}
                  value={shipData.mark}
                  readOnly
                />
              </div>

              {getRoleFromToken() != null &&
              getRoleFromToken() != userType.CLIENT ? (
                <div className="changeBtn">
                  <Button
                    style={{ marginLeft: "35%" }}
                    variant="contained"
                    onClick={handleOpenForm}
                  >
                    Change info
                  </Button>
                  <Button
                    style={{ marginLeft: "5%" }}
                    variant="contained"
                    onClick={handleOpenDeleteDialog}
                  >
                    Delete
                  </Button>
                </div>
              ) : getRoleFromToken() != null && getRoleFromToken() == userType.CLIENT ? (
                <Button
                    style={{ marginLeft: "5%" }}
                    variant="contained"
                    onClick={handleSubscribe}
                  >
                   { (subscribed) ? "Unsubscribe" : "Subscribe"}
                  </Button>
              ) : <></>}
            </div>
            <Modal
              open={openChangeForm}
              onClose={handleCloseForm}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                backgroundColor: "rgb(218, 224, 210, 0.6)",
                overflow: "auto",
              }}
            >
              <ChangeShipForm
                currentShipData={shipData}
                closeForm={handleCloseForm}
                childToParent={childToParent}
              />
            </Modal>
            <Modal
              open={openDialog}
              onClose={handleCloseDeleteDialog}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                backgroundColor: "rgb(218, 224, 210, 0.6)",
                overflow: "auto",
              }}
            >
              <DeleteShip
                closeDialog={handleCloseDeleteDialog}
                open={openDialog}
                name={shipData.name}
                id={shipData.id}
              />
            </Modal>

            {/* <ImagesBox images={photos} /> */}
            <ImagesGallery photos={photos}></ImagesGallery>

            <QuickActionBox offer={shipData} />
            <MapBox
              street={shipData.street}
              city={shipData.city}
              state={shipData.state}
            />
            <Grid container xs={12}>
              <Grid item xs={12} sm={6}>
                <BasicShipInfoBox basicInfo={shipData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AdditionalDescriptionBox additionData={shipData}  />
              </Grid>
            </Grid>
            <PriceList offer={shipData} additionalServices={createServiceData()} />
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default ShipProfilePage;
