import { getAllComplaints } from "../../../services/AdminService";

import {
  getAllNotReviewedReservationReports,
  addPenaltyToCLient,
  rejectPenaltyToCLient,
} from "../../../services/ReservationService";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShowMoreText from "react-show-more-text";
import "../../collections/RegistrationRequestsList.scss";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import ratingIcon from "../../images/satisfaction.png";
import table_icon from "../../images/reservation_report_icon.png";
import Divider from "@mui/material/Divider";
import ComplaintResponse from "./ComplaintResponse";
import { Modal } from "@mui/material";

function Row({ complaint, setComplaints, complaints }) {
  const [open, setOpen] = React.useState(false);
  const [openResponse, setOpenResponse] = useState(false);

  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  const theme = createTheme({
    palette: {
      primary: { main: "#CC7351" },
      secondary: { main: "#99A799" },
    },
  });

  function handleOpenResponse() {
    setOpenResponse(true);
  }

  function handleCloseResponse() {
    setOpenResponse(false);
  }

  if (!!complaint && !!setComplaints) {
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
              {complaint.offerName}
            </TableCell>
            <TableCell
              sx={{ fontSize: 16 }}
              align="center"
            >{`${complaint.clientName}`}</TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {complaint.recivedTime}
            </TableCell>
            <TableCell>
              <Button
                type="submit"
                variant="contained"
                sx={{ float: "right" }}
                color="primary"
                size="small"
                onClick={() => handleOpenResponse(complaint)}
              >
                respond to the complaint
              </Button>
            </TableCell>
          </TableRow>

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
                    Text
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
                      {complaint.text}
                    </ShowMoreText>
                  </div>
                  <br></br>

                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Reservation date:
                    <label className="textItem">
                      {" "}
                      {`${complaint.reservationStartDate}  -  ${complaint.reservationEndDate}`}{" "}
                    </label>
                  </Typography>

                  <br></br>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Client name:
                    <label className="textItem"> {complaint.clientName} </label>
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Client category:
                    <label className="textItem">
                      {" "}
                      {`${complaint.clientCategory}`}{" "}
                    </label>
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Client penalty:
                    <label className="textItem">
                      {" "}
                      {`${complaint.clientPenalty}`}{" "}
                    </label>
                  </Typography>
                </Box>
              </Collapse>
            </TableCell>
            <Modal
              open={openResponse}
              onClose={handleCloseResponse}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)" }}
            >
              <ComplaintResponse
                complaint={complaint}
                close={handleCloseResponse}
                setComplaints={setComplaints}
                complaints={complaints}
              />
            </Modal>
          </TableRow>
        </React.Fragment>
      </ThemeProvider>
    );
  } else return null;
}

function ComplaintList() {
  const [complaints, setComplaints] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function setData() {
      const responseData = await getAllComplaints();
      setComplaints(responseData.data ? responseData.data : {});
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

  if (!!complaints) {
    return (
      <div className="requestsC ontainer">
        <Typography variant="h6" sx={{ color: "#5f6d5f" }}>
          As an administrator, you are able to answer on client's complaints.
        </Typography>
        <Divider />

        <TableContainer component={Paper} className="tableContainer">
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ borderBottom: "solid #99A799" }}>
                <TableCell>
                  <img width="60" height={"60"} src={table_icon}></img>{" "}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                  align="center"
                >
                  <Typography variant="button">Offer</Typography>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                  align="center"
                >
                  <Typography variant="button">Client</Typography>
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
              {complaints
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row
                    key={row.id}
                    complaint={row}
                    setComplaints={setComplaints}
                    complaints={complaints}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={complaints.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {complaints.length === 0 && (
          <Typography variant="h6" sx={{ color: "#CC7351" }}>
            There are currently no reservation reports for reviewing
          </Typography>
        )}
      </div>
    );
  } else return null;
}

export default ComplaintList;
