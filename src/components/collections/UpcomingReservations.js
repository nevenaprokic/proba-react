import { useEffect, useState } from "react";
import * as React from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { offerType } from "../../app/Enum";
import { getUpcomingCottageReservationsClient, getUpcomingShipReservationsClient, getUpcomingAdventureReservationsClient, cancelReservation } from "../../services/ReservationService"
import ConfirmDialog from "../notifications/ConfirmDialog";
import Modal from "@mui/material/Modal";
import ClientSort from "../forms/search/ClientSort";

function Row({row, setRequests, requests}) {
    const  request  = row;
    const [open, setOpen] = React.useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);

    function handleOpenConfirm(){ setOpenConfirm(true);};
    function handleCloseConfirm(){setOpenConfirm(false);};

    const theme = createTheme({
        palette: {
          primary: { main:'#CC7351'},
          secondary: { main:'#99A799'},
        },

    });
  
    function handleCancel(){
        const removeFromTable = () =>{
            requests = requests.filter(data => data != row);
            setRequests(requests);
        };
        cancelReservation(request.id, removeFromTable);
    }

    return (
        <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
          <TableCell sx={{fontSize: 16}} align="center" >{request.clienName + " " + request.clientLastName}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{request.offerName}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{request.startDate}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{request.endDate}</TableCell>
          <TableCell ><Button 
                    type="submit"
                    variant="contained"
                    sx={{float:"right"}}
                    color="primary"
                    size="small"
                    onClick={handleOpenConfirm}
                  >
                      Cancel
                  </Button></TableCell>
          
        </TableRow>

        <Modal
                    open={openConfirm}
                    onClose={handleCloseConfirm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{backgroundColor:"rgb(218, 224, 210, 0.6)", overflow:"auto"}}
                >
                        <ConfirmDialog close={handleCloseConfirm} cbOnConfirm={handleCancel} message="Do you really want to cancel?" />
                    
                </Modal>
        
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                <PersonIcon/>
                   {"\t\tClient info"}
                </Typography>
                    <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Email address:
                        <label className="textItem"> {request.clientEmail} </label>
                    </Typography>
                 <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Phone number: 
                        <label className="textItem"> {request.phoneNumber} </label>
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                  <LocationOnIcon/>
                  {"\t\tOffer info"}
                </Typography>
                    <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                     
                        Price:
                        <label className="textItem"> {request.price + "€"} </label>
                    </Typography>
                 <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Number of person: 
                        <label className="textItem"> {request.numberOfPerson} </label>
                </Typography>
                <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Additional services: 
                        <label className="textItem"> {request.additionalServices.map((service) => service.serviceName + ": " + service.servicePrice + "€, ")} </label>
                </Typography>                
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      </ThemeProvider>
    );
  }


function UpcomingReservations( { offerT } ){
    const [requests, setRequests] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    let getReservation = {
      [offerType.COTTAGE]: getUpcomingCottageReservationsClient,
      [offerType.SHIP]: getUpcomingShipReservationsClient,
      [offerType.ADVENTURE]: getUpcomingAdventureReservationsClient,
    };

    useEffect(() => {
        async function setData(){
          const responseData = await getReservation[offerT]();
          setRequests(responseData.data ? responseData.data : {});
        }
        setData();

    }, []);

    useEffect(() => {
       // data update
      }, [requests]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    

    return ( 
      !!requests && 
        <div className="requestsContainer">
        <TableContainer component={Paper} className="tableContainer">
            <Table aria-label="collapsible table" >
                <TableHead>
                <TableRow sx={{borderBottom:"solid #99A799"}}>
                    <TableCell />
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18}} align="center">
                        <Typography variant="button">
                            Client
                        </Typography>    
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }} align="center">
                        <Typography variant="button" >
                            Offer name
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }} align="center">
                        <Typography variant="button">
                            Start date
                        </Typography></TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }} align="center">
                        <Typography variant="button">
                            End date
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "#5f6d5f" }} align="center">
                        <Typography variant="button">
                            <ClientSort reservations={requests} setReservations={setRequests} />
                        </Typography>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                </TableRow>
                </TableHead>
                <TableBody>
                {requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    
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
      {requests.length == 0 && <Typography variant="h6" sx={{color:"#CC7351"}}>There are currently no reservations in past</Typography>}
    </div>
    )
}

export default UpcomingReservations;