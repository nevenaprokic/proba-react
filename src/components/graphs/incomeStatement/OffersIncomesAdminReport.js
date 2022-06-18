import { useEffect, useState } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import "../../collections/RegistrationRequestsList.scss";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';



function Row({offer}) {
   
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

    // function handleRequestAccepted(reviewdReport){
    //   addPenaltyToCLient(reviewdReport, setReports, reports);
    // }

    // function handleRejectMark(reviewdReport){
    //   rejectPenaltyToCLient(reviewdReport, setReports, reports);
    // }

    return (
         !!offer && 
        <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          
          <TableCell sx={{fontSize: 16}} align="center" >{offer.offerName}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{offer.numberOfReservation}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{offer.realPrice}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{offer.earningPercent}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{offer.totalPrice}</TableCell>
        </TableRow>
      </React.Fragment>
      </ThemeProvider>
    );
  }

  function OfferIncomesAdminReport({offerList}){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    

    return (
        !!offerList && 
        <div className="requestsC ontainer">
        
        <TableContainer component={Paper} className="tableContainer">
            <Table aria-label="collapsible table" >
                <TableHead sx={{backgroundColor:"rgb(211, 228, 205, 0.4)"}}>
                
                <TableRow sx={{borderBottom:"solid #99A799"}}>
                    
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18}} align="center">
                        <Typography variant="button">
                            Offer
                        </Typography>    
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }} align="center">
                        <Typography variant="button" >
                            Number of reservations
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }} align="center">
                        <Typography variant="button">
                            Real price (€) 
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }} align="center">
                        <Typography variant="button">
                            Earning percent (%)
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }} align="center">
                        <Typography variant="button">
                            Earning (€)
                        </Typography>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                </TableRow>
                </TableHead>
                <TableBody>
                {offerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    
                    <Row key={row.id} offer={row}/>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={offerList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {offerList.length === 0 && <Typography variant="h6" sx={{color:"#CC7351"}}>There are no reservations for selected period</Typography>}
    </div>
    )
  }

  export default OfferIncomesAdminReport;