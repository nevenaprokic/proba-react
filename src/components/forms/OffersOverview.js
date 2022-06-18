import { useEffect, useState } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import Divider from "@mui/material/Divider";
import {
  getAllCottages,
  deleteCottageByAdmin,
} from "../../services/CottageService";
import { getAllShips, deleteShipByAdmin } from "../../services/ShipService";
import {
  getAllAdventures,
  deleteAdventureByAdmin,
} from "../../services/AdventureService";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { offerType } from "../../app/Enum";
import AdventureProfilePage from "../profilePages/adventureProfile/AdvetureProfilePage";
import CottageProfilePage from "../profilePages/cottageProfile/CottageProfilePage";
import ShipProfilePage from "../profilePages/shipProfile/ShipProfilePage";
import { Modal } from "@mui/material";

function Row({ offer, setOffers, allOffers, typeOfOffer }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalOfferComponent = (offerId) => {
    switch (typeOfOffer) {
      case "ADVENTURE":
        return <AdventureProfilePage id={offerId} close={handleClose} />;
      case "COTTAGE":
        return <CottageProfilePage id={offerId} close={handleClose} />;
      case "SHIP":
        return <ShipProfilePage id={offerId} close={handleClose} />;
      default:
        return <div>Undefined offer type</div>;
    }
  };

  const deleteFunction = {
    ADVENTURE: deleteAdventureByAdmin,
    COTTAGE: deleteCottageByAdmin,
    SHIP: deleteShipByAdmin,
  };

  function handleDeleteOffer() {
    deleteFunction[typeOfOffer](offer.id, setOffers, allOffers);
  }

  const theme = createTheme({
    palette: {
      primary: { main: "#CC7351" },
      secondary: { main: "#99A799" },
    },
  });

  if (!!offer && !!setOffers) {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {offer.name ? offer.name : offer.offerName}
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {offer.price}
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {offer.peopleNum ? offer.peopleNum : offer.numberOfPerson}
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {offer.ownerName}
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                sx={{ float: "right" }}
                color="primary"
                size="small"
                onClick={() => handleDeleteOffer()}
              >
                Delete offer
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                sx={{ float: "right" }}
                color="primary"
                size="small"
                onClick={handleOpen}
              >
                View offer
              </Button>
            </TableCell>
          </TableRow>

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
            {modalOfferComponent(offer.id)}
          </Modal>
        </React.Fragment>
      </ThemeProvider>
    );
  } else return null;
}

function OffersOverview() {
  const [offers, setOffers] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [offerTypes, setOfferTypes] = useState();
  const [selectedOfferType, setSelectedOfferType] = useState();
  const [offersNumber, setOfferNumber] = useState();

  const getOffersFunction = {
    ADVENTURE: getAllAdventures,
    COTTAGE: getAllCottages,
    SHIP: getAllShips,
  };

  useEffect(() => {
    let offers_type = [
      { label: "COTTAGE" },
      { label: "SHIP" },
      { label: "ADVENTURE" },
    ];

    setOfferTypes(offers_type);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setTableData(selectedOfferType, newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setTableData(selectedOfferType, 0, +event.target.value);
  };

  const hadnleOfferTypeCange = (event, selectedItem) => {
    if (!selectedItem) return;
    setSelectedOfferType(selectedItem.label);
    setTableData(selectedItem.label, page, rowsPerPage);
  };

  function setTableData(offer_type, selectedPage, selectedPageSize) {
    async function set() {
      console.log(offer_type);
      const response = await getOffersFunction[offer_type](
        selectedPage,
        selectedPageSize
      );
      setOffers(!!response.data ? response.data : {});
      setOfferNumber(
        !!response.data.length > 0 ? response.data[0].offerNumber : 0
      );
      return response;
    }
    set();
  }

  if (!!offerTypes) {
    return (
      <div className="requestsC ontainer">
        <Typography variant="h6" sx={{ color: "#5f6d5f" }}>
          As an administrator, you can delete any offer if it doesn't have
          future reservations.
        </Typography>
        <Divider />
        <br />
        <Typography variant="body1" sx={{ color: "#5f6d5f" }}>
          Select the offer type
        </Typography>
        <br />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={offerTypes}
          sx={{ width: 250 }}
          onChange={(event, newValue) => {
            hadnleOfferTypeCange(event, newValue);
          }}
          renderInput={(params) => <TextField {...params} label="User type" />}
        />
        <br />
        {!!offers && (
          <>
            <TableContainer component={Paper} className="tableContainer">
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow sx={{ borderBottom: "solid #99A799" }}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#5f6d5f",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <Typography variant="button">Offer name</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#5f6d5f",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <Typography variant="button">Price</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#5f6d5f",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <Typography variant="button">Max persons</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#5f6d5f",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <Typography variant="button">Owner</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map((row) => (
                    <Row
                      key={row.id}
                      offer={row}
                      setOffers={setOffers}
                      allOffers={offers}
                      typeOfOffer={selectedOfferType}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[1, 2, 10]}
              component="div"
              count={offersNumber}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {offersNumber === 0 && (
              <Typography variant="h6" sx={{ color: "#CC7351" }}>
                There are currently no offers for selected type
              </Typography>
            )}
          </>
        )}
      </div>
    );
  } else return null;
}

export default OffersOverview;
