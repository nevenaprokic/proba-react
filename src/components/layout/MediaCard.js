import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../style/MediaCard.scss";
import CottageProfilePage from "../profilePages/cottageProfile/CottageProfilePage";
import { useState } from "react";
import { useEffect } from "react";
import Rating from "@mui/material/Rating";
import { getRoleFromToken } from "../../app/jwtTokenUtils";
import Modal from "@mui/material/Modal";
import { userType, offerType } from "../../app/Enum";
import AdventureProfilePage from "../profilePages/adventureProfile/AdvetureProfilePage";
import ShipProfilePage from "../profilePages/shipProfile/ShipProfilePage";
import InstructorProfile from "../profilePages/userProfile/InstructorProfile";
import ReservationForm from "../forms/reservations/ReservationForm";

const secondaryTheme = createTheme({
  palette: {
    primary: { main: "#9DAB86" },
    secondary: { main: "#ffffff" },
  },
});

export default function MediaCard({ offer, offerT, canReserve }) {
  const [offerData, setOfferData] = useState();

  const [open, setOpen] = useState(false);
  const [openReserve, setOpenReserve] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenReserve = () => setOpenReserve(true);
  const handleCloseReserve = () => setOpenReserve(false);

  let imag = require("../images/no-image.png");
  let imagHeight = 140;
  if (offerT == userType.INSTRUCTOR) {
    imag = require("../images/profile.png");
    imagHeight = 220;
  }

  const childToParent = (childData) => {
    if (offerT === offerType.ADVENTURE) {
      imag = require("../images/no-image.png");
      if (childData.photos.length != 0) {
        imag = "data:image/jpg;base64," + childData.photos[0];
      }
      setOfferData((prevState) => ({
        ...prevState,
        ["offerName"]: childData.offerName,
        ["description"]: childData.description,
        ["photos"]: childData.photos,
      }));
    } else {
      setOfferData((prevState) => ({
        ...prevState,
        ["name"]: childData.name,
        ["description"]: childData.description,
        ["photos"]: childData.photos,
      }));
    }
  };

  const modalOfferComponent = (offerStr, offerId) => {
    switch (offerStr) {
      case offerType.ADVENTURE:
        return (
          <AdventureProfilePage
            id={offerId}
            close={handleClose}
            childToParentMediaCard={childToParent}
          />
        );
      case offerType.COTTAGE:
        return (
          <CottageProfilePage
            id={offerId}
            close={handleClose}
            childToParentMediaCard={childToParent}
          />
        );
      case offerType.SHIP:
        return (
          <ShipProfilePage
            id={offerId}
            close={handleClose}
            childToParentMediaCard={childToParent}
          />
        );
      case userType.INSTRUCTOR:
        return (<InstructorProfile instructor={offer} close={handleClose} />);
      default:
        return (<div>Undefined offer type</div>);
    }
  };

  useEffect(() => {}, [offerData]);

  let minH = offerT == userType.INSTRUCTOR ? 450 : 400;
  let maxH = offerT == userType.INSTRUCTOR ? 450 : 400;

  useEffect(() => {
    if (!offerData) setOfferData(offer);
  }, []);

  if (!!offerData) {
    return (
      <ThemeProvider theme={secondaryTheme}>
        <Card sx={{ maxWidth: 345, maxHeight: maxH, minHeight: minH }}>
          <CardMedia
            component="img"
            height={imagHeight}
            image={
              offerData.photos
                ? offerData.photos.length != 0
                  ? "data:image/jpg;base64," + offerData.photos[0]
                  : imag
                : imag
            }
            alt="slike"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="primary"
            >
              {offerT == userType.INSTRUCTOR
                ? offerData.firstName + " " + offerData.lastName
                : offerData.name && offerT != userType.INSTRUCTOR
                ? offerData.name
                : offerData.offerName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <p>
                <Rating
                  name="half-rating-read"
                  precision={0.5}
                  value={offerData.mark}
                  readOnly
                />
              </p>
              {offerT != userType.INSTRUCTOR && (
                <p>Price: {offerData.price}€</p>
              )}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <p className="descriptionContainer">
                {" "}
                {offerT != userType.INSTRUCTOR
                  ? offerData.description
                  : offerData.biography}{" "}
              </p>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              bgcolor="secondary"
              color="primary"
              onClick={handleOpen}
            >
              View
            </Button>
            {getRoleFromToken() == userType.CLIENT &&
              offerT != userType.INSTRUCTOR && (
                <Button
                  size="small"
                  variant="contained"
                  bgcolor="secondary"
                  color="primary"
                  disabled={!canReserve}
                  onClick={handleOpenReserve}
                >
                  Book now
                </Button>
              )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                backgroundColor: "rgb(218, 224, 210, 0.6)",
                overflow: "auto",
              }}
            >
              {modalOfferComponent(offerT, offer.id)}
            </Modal>

            <Modal
              open={openReserve}
              onClose={handleCloseReserve}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                backgroundColor: "rgb(218, 224, 210, 0.6)",
                overflow: "auto",
              }}
            >
              <ReservationForm offer={offer} close={handleCloseReserve} />
            </Modal>
          </CardActions>
        </Card>
      </ThemeProvider>
    );
  }else return null;
}
