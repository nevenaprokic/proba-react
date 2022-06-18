import "./CottageProfilePage.scss";
import { Grid, Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import {
  getCottageById,
  checkReservation,
} from "../../../services/CottageService";
import { useState, useEffect } from "react";
import QuickActionBox from "./QuickActionBox";
import BasicCottageInfoBox from "../cottageProfile/BasicCottageInfoBox";
import AdditionalDescriptionBox from "./AdditionalDescriptionBox";
import PriceList from "./Pricelist";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import { getRoleFromToken } from "../../../app/jwtTokenUtils";
import { userType } from "../../../app/Enum";
import DeleteCottage from "../../forms/cottage/DeleteCottage";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import MapBox from "./MapBox";
import ChangeCottageForm from "../../forms/cottage/ChangeCottageForm";
import {
  subscribe,
  unsubscribe,
  isSubscribed,
} from "../../../services/ClientService";
import ImagesBox from "../adventureProfile/ImagesBox";
import ImagesGallery from "../../layout/ImageGallery";
import MarksContainer from "./MarksContainer";

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

function CottageProfilePage({ id, close, childToParentMediaCard }) {
  const [cottageData, setCottageData] = useState();
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
    let allowed = await checkReservation(cottageData);
    if (allowed) {
      if (operation) setOpenForm(true);
      else setOpenDialog(true);
    } else {
      let message =
        "Delete is not allowed because this cottage has reservations.";
      if (operation)
        message =
          "Update is not allowed because this cottage has reservations.";
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    }
  }
  const childToParent = (childData) => {
    setCottageData((prevState) => ({
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
      ["bedNumber"]: childData.bedNumber,
      ["roomNumber"]: childData.roomNumber,
    }));

    childToParentMediaCard(childData);
  };

  useEffect(() => {
    if (getRoleFromToken() == userType.CLIENT) {
      isSubscribed(id, setSubscribed);
    }
    async function setcottageData() {
      let cottage = await getCottageById(id);
      setCottageData(!!cottage ? cottage.data : {});
      return cottage;
    }
    setcottageData();
  }, []);

  useEffect(() => {}, [subscribed]);

  function createServiceData() {
    let rows = [];
    cottageData.additionalServices.forEach((data) => {
      let name = data.serviceName;
      let price = data.servicePrice;
      rows.push({ name, price });
    });
    return rows;
  }

  function handleSubscribe() {
    setSubscribed(!subscribed);
    if (subscribed) {
      unsubscribe(cottageData.id);
    } else {
      subscribe(cottageData.id);
    }
  }

  let images = [];

  if (!!cottageData) {
    cottageData.photos.forEach((photo) => {
      let imag = { image: "data:image/jpg;base64," + photo };
      images.push(imag);
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
              <h2 className="adventureTittle">{cottageData.name}</h2>

              <Divider />
              <div className="mark">
                <Rating
                  name="half-rating-read"
                  precision={0.5}
                  value={cottageData.mark}
                  readOnly
                />
              </div>
              {getRoleFromToken() != null &&
              getRoleFromToken() == userType.COTTAGE_OWNER ? (
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
              ) : getRoleFromToken() != null &&
                getRoleFromToken() == userType.CLIENT ? (
                <Button
                  style={{ marginLeft: "5%" }}
                  variant="contained"
                  onClick={handleSubscribe}
                >
                  {subscribed ? "Unsubscribe" : "Subscribe"}
                </Button>
              ) : (
                <></>
              )}
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
              <ChangeCottageForm
                currentCottageData={cottageData}
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
              <DeleteCottage
                closeDialog={handleCloseDeleteDialog}
                open={openDialog}
                name={cottageData.name}
                id={cottageData.id}
              />
            </Modal>
            {/* <ImagesBox images={images} /> */}
            <ImagesGallery photos={images}></ImagesGallery>

            <QuickActionBox offer={cottageData} />
            <MapBox
              street={cottageData.street}
              city={cottageData.city}
              state={cottageData.state}
            />
            <Grid container xs={12}>
              <Grid item xs={12} sm={6}>
                <BasicCottageInfoBox basicInfo={cottageData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AdditionalDescriptionBox additionData={cottageData} />
              </Grid>
            </Grid>
            <PriceList
              offer={cottageData}
              additionalServices={createServiceData()}
            />
            {getRoleFromToken() != null && (
              <MarksContainer offerId={cottageData.id} />
            )}
          </div>
        </ThemeProvider>
      </div>
    );
  } else return null;
}

export default CottageProfilePage;
