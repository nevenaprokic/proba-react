import { getAllNotReviewedReservationReports, addPenaltyToCLient, rejectPenaltyToCLient } from "../../../services/ReservationService";
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
import ShowMoreText from "react-show-more-text";
import "../../collections/RegistrationRequestsList.scss";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import ratingIcon from '../../images/satisfaction.png';
import table_icon from '../../images/reservation_report_icon.png';
import Divider from '@mui/material/Divider';


function Row({report, setReports, reports}) {
   
    const [open, setOpen] = React.useState(false);

    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }

    const theme = createTheme({
        palette: {
          primary: { main:'#CC7351'},
          secondary: { main:'#99A799'},
        },

    });

    function handleRequestAccepted(reviewdReport){
      addPenaltyToCLient(reviewdReport, setReports, reports);
    }

    function handleRejectMark(reviewdReport){
      rejectPenaltyToCLient(reviewdReport, setReports, reports);
    }

    return (
         !!reports && !!setReports &&
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
          <TableCell sx={{fontSize: 16}} align="center" >{report.reservationDTO.offerName}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{`${report.reservationDTO.clienName} ${report.reservationDTO.clientLastName}`}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{report.reportSentDate}</TableCell>
          <TableCell ><Button 
                    type="submit"
                    variant="contained"
                    sx={{float:"right"}}
                    color="primary"
                    size="small"
                    onClick={() => handleRequestAccepted(report)}
                  >
                  Add penalty 
                  </Button></TableCell>
          <TableCell ><Button 
                    type="submit"
                    variant="contained"
                    sx={{float:"right"}}
                    color="secondary"
                    size="small"
                    onClick={() => handleRejectMark(report)}
                  >
                  Reject penalty
                  </Button></TableCell>
        </TableRow>
       
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                  Comment
                </Typography>
                <div >
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
                            {report.comment}
                        </ShowMoreText>
                </div>
                <br></br>
                <Typography variant="h6" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                  Reservation details
                </Typography>
                    <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Reservation date:
                        <label className="textItem"> {`${report.reservationDTO.startDate}  -  ${report.reservationDTO.endDate}`} </label>
                    </Typography>
                    <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Persons: 
                        <label className="textItem"> {report.reservationDTO.numberOfPerson} </label>
                    </Typography>
                <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Price: 
                        <label className="textItem"> {report.reservationDTO.price} e</label>
                </Typography>
                <br></br>
                <Typography variant="h6" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                  Client details
                </Typography><Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Name: 
                        <label className="textItem"> {`${report.clientDTO.firstName} ${report.clientDTO.lastName}`} </label>
                </Typography>
                <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Category: 
                        <label className="textItem"> {`${report.clientDTO.clientCategory}`} </label>
                </Typography>
                <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Penal: 
                        <label className="textItem"> {`${report.clientDTO.penal}`} </label>
                </Typography>
                
                
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      </ThemeProvider>
    );
  }

function ReservationReportsList(){
    
    const [reports, setReports] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        async function setData(){
            const responseData = await getAllNotReviewedReservationReports();
          
            setReports(!!responseData.data ? responseData.data : {});
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
    

    return (
        !!reports && 
        <div className="requestsC ontainer">
            <Typography variant="h6" sx={{color:"#5f6d5f"}}>
                As an administrator, you are able to add penalty points to clients depending on their behaviour during the reservation.
            </Typography>
            <Divider/>

        <TableContainer component={Paper} className="tableContainer">
            <Table aria-label="collapsible table" >
                <TableHead>
                
                <TableRow sx={{borderBottom:"solid #99A799"}}>
                    <TableCell><img width="60" height={"60"} src={table_icon}></img> </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18}} align="center">
                        <Typography variant="button">
                            Offer
                        </Typography>    
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }} align="center">
                        <Typography variant="button" >
                            Client
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }} align="center">
                        <Typography variant="button">
                            Recived time
                        </Typography>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                </TableRow>
                </TableHead>
                <TableBody>
                {reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    
                    <Row key={row.id} report={row} setReports={setReports} reports={reports}/>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={reports.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {reports.length === 0 && <Typography variant="h6" sx={{color:"#CC7351"}}>There are currently no reservation reports for reviewing</Typography>}
    </div>
    )
}


export default ReservationReportsList;