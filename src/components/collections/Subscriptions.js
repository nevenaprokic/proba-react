import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Modal from "@mui/material/Modal";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import InfoIcon from '@mui/icons-material/Info';
import { getSubscriptions } from "../../services/ClientService";
import ConfirmDialog from "../notifications/ConfirmDialog";
import { unsubscribe } from "../../services/ClientService";

function Row({ row, setRequests, requests }) {
    const request = row;
    const [open, setOpen] = React.useState(false);
  
  
    const theme = createTheme({
      palette: {
        primary: { main: "#CC7351" },
        secondary: { main: "#99A799" },
      },
    });
  
    const [openUnsubscribe, setOpenUnsubscribe] = React.useState(false);
  
    function handleOpenSubscribe(){setOpenUnsubscribe(true);}
    function handleCloseSubscribe(){setOpenUnsubscribe(false);}

    function handleUnsubscribe(offerId){
        setRequests(requests.filter(item => item.id !== offerId));
        unsubscribe(offerId);
    };  
  
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
            <TableCell sx={{fontSize: 16}} align="center" >{request.name}</TableCell>
            <TableCell sx={{fontSize: 16}} align="center">{request.street}</TableCell>
            <TableCell sx={{fontSize: 16}} align="center">{request.city}</TableCell>
            <TableCell sx={{fontSize: 16}} align="center">{request.state}</TableCell>
         
            <TableCell >
                <Button 
                    type="submit"
                    variant="contained"
                    sx={{float:"right"}}
                    color="primary"
                    size="small"
                    onClick={() => handleOpenSubscribe()}
                    >
                    Unsubscribe 
                </Button>
            </TableCell>
         </TableRow>
            <Modal
                  open={openUnsubscribe}
                  onClose={handleCloseSubscribe}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{backgroundColor:"rgb(218, 224, 210, 0.6)", overflow:"auto"}}
              >
                      <ConfirmDialog close={handleCloseSubscribe} cbOnConfirm={() => handleUnsubscribe(request.id)} message={"Are you sure?"} />
                  
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
                    <InfoIcon style={{ verticalAlign: '-5' }}  />
                    {"\t\t Offer info"}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Price:
                    <label className="textItem"> {request.price + "€"} </label>
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Number of person:
                    <label className="textItem"> {request.numberOfPerson} </label>
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                    fontWeight="bold"
                  >
                    Description:
                    <label className="textItem"> {request.description} </label>
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Rules:
                    <label className="textItem"> {request.rulesOfConduct} </label>
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Additional services:
                    <label className="textItem">
                      {" "}
                      {request.additionalServices.map(
                        (service) =>
                          service.serviceName +
                          ": " +
                          service.servicePrice +
                          "€, "
                      )}{" "}
                    </label>
                  </Typography>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      </ThemeProvider>
    );
  }
  
  function Subscriptions() {
    const [requests, setRequests] = useState();
    const [report, setReport] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    useEffect(() => {
      async function setData() {
        const responseData = await getSubscriptions();
        console.log(responseData);
        setRequests(responseData ? responseData : {});
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
  
    return (requests && (
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
                    <Typography variant="button">Offer name</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                    align="center"
                  >
                    <Typography variant="button">Street</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                    align="center"
                  >
                    <Typography variant="button">City</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                    align="center"
                  >
                    <Typography variant="button">Country</Typography>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {requests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <Row key={row.id} row={row} setRequests={setRequests} requests={requests} />
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
              You don't have any subscriptions yet.
            </Typography>
          )}
        </div>
      )
    );
  }
  
  export default Subscriptions;
  