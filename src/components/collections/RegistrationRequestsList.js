import { useEffect, useState } from "react";
import {
  getAllRegistrationRegusestr,
  acceptRegistrationRequest,
} from "../../services/RegistrationRequestService";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShowMoreText from "react-show-more-text";
import "./RegistrationRequestsList.scss";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import RejecetRegistrationRequestForm from "./RejecetRegistrationRequestForm";
import Modal from "@mui/material/Modal";

function Row({ row, setRequests }) {
  console.log(row);
  const request = row;
  const [open, setOpen] = React.useState(false);

  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  const theme = createTheme({
    palette: {
      primary: { main: "#CC7351" },
      secondary: { main: "#99A799" },
    },
  });

  const [openDeleteManager, setDeleteManager] = useState(false);

  const handleOpenDelete = () => setDeleteManager(true);
  const handleCloseDelete = () => setDeleteManager(false);

  function handleRequestAccepted(requestId) {
    console.log(requestId);
    acceptRegistrationRequest(requestId, setRequests);
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <label className="deatilsItem">details</label>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell sx={{ fontSize: 16 }} align="center">
            {request.firstName}
          </TableCell>
          <TableCell sx={{ fontSize: 16 }} align="center">
            {request.lastName}
          </TableCell>
          <TableCell sx={{ fontSize: 16 }} align="center">
            {request.type}
          </TableCell>
          <TableCell sx={{ fontSize: 16 }} align="center">
            {request.sendingTime}
          </TableCell>
          <TableCell>
            <Button
              type="submit"
              variant="contained"
              sx={{ float: "right" }}
              color="primary"
              size="small"
              onClick={() => handleRequestAccepted(request.id)}
            >
              Accept
            </Button>
          </TableCell>
          <TableCell>
            <Button
              type="submit"
              variant="contained"
              sx={{ float: "right" }}
              color="secondary"
              size="small"
              onClick={handleOpenDelete}
            >
              Discard
            </Button>
          </TableCell>
        </TableRow>
        <Modal
          open={openDeleteManager}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)" }}
        >
          <RejecetRegistrationRequestForm
            close={handleCloseDelete}
            requestId={request.id}
            setRequests={setRequests}
          />
        </Modal>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ color: "#5f6d5f" }}
                >
                  Explanation for registration
                </Typography>
                <div>
                  <ShowMoreText
                    lines={4}
                    more="Show more"
                    less="Show less"
                    className="content-css"
                    anchorClass="my-anchor-css-class"
                    onClick={executeOnClick}
                    expanded={false}
                    width={280}
                    truncatedEndingComponent={"... "}
                  >
                    {request.explanation}
                  </ShowMoreText>
                </div>
                <br></br>
                <Typography
                  variant="body1"
                  gutterBottom
                  component="div"
                  sx={{ color: "#5f6d5f" }}
                >
                  Address:
                  <label className="textItem">
                    {" "}
                    {request.street +
                      ", " +
                      request.city +
                      ", " +
                      request.state}{" "}
                  </label>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  component="div"
                  sx={{ color: "#5f6d5f" }}
                >
                  Phone number:
                  <label className="textItem"> {request.phoneNumber} </label>
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </ThemeProvider>
  );
}

function RegistrationRequestsList() {
  const [requests, setRequests] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function setData() {
      const responseData = await getAllRegistrationRegusestr();
      console.log(responseData.data);
      setRequests(responseData.data ? responseData.data : {});
    }
    setData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!!requests) {
    return (
      <div className="requestsContainer">
        <TableContainer component={Paper} className="tableContainer">
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ borderBottom: "solid #99A799" }}>
                <TableCell />
                <TableCell
                  sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                  align="center"
                >
                  <Typography variant="button">First name</Typography>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                  align="center"
                >
                  <Typography variant="button">Last name</Typography>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                  align="center"
                >
                  <Typography variant="button">Owner type</Typography>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                  align="center"
                >
                  <Typography variant="button">Recived time</Typography>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {requests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row key={row.id} row={row} setRequests={setRequests} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {requests.length == 0 && (
          <Typography variant="h6" sx={{ color: "#CC7351" }}>
            There are currently no registration requests
          </Typography>
        )}
      </div>
    );
  } else return null;
}

export default RegistrationRequestsList;
