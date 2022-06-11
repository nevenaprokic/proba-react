import { getAllNotApprovedMarks, acceptMark, rejectMark } from "../../../services/MarkService";
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
import ratingIcon from '../../images/satisfaction.png'


function Row({row, setRequests, marks}) {
    console.log(row);
    const  request  = row;
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

    function handleRequestAccepted(mark){
      acceptMark(mark, setRequests, marks)
    }

    function handleRejectMark(mark){
      rejectMark(mark, setRequests, marks)
    }

    return (
         !!marks &&
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
          <TableCell sx={{fontSize: 16}} align="center" >{request.reservationDTO.offerName}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{`${request.reservationDTO.clienName} ${request.reservationDTO.clientLastName}`}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{request.mark}</TableCell>
          <TableCell sx={{fontSize: 16}} align="center">{request.sendingTime}</TableCell>
          <TableCell ><Button 
                    type="submit"
                    variant="contained"
                    sx={{float:"right"}}
                    color="primary"
                    size="small"
                    onClick={() => handleRequestAccepted(request)}
                  >
                  Accept 
                  </Button></TableCell>
          <TableCell ><Button 
                    type="submit"
                    variant="contained"
                    sx={{float:"right"}}
                    color="secondary"
                    size="small"
                    onClick={() => handleRejectMark(request)}
                  >
                  Discard
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
                            {request.comment}
                        </ShowMoreText>
                    </div>
                    <br></br>
                    <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Reservation date:
                        <label className="textItem"> {`${request.reservationDTO.startDate}  -  ${request.reservationDTO.endDate}`} </label>
                    </Typography>
                 <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Persons: 
                        <label className="textItem"> {request.reservationDTO.numberOfPerson} </label>
                </Typography>
                <Typography variant="body1" gutterBottom component="div" sx={{color:"#5f6d5f"}}>
                        Price: 
                        <label className="textItem"> {request.reservationDTO.price} e</label>
                </Typography>
                
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      </ThemeProvider>
    );
  }

function NotApprovedMarks(){
    
    const [marks, setMarks] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        async function setData(){
            const responseData = await getAllNotApprovedMarks();
            console.log(responseData.data);
            setMarks(responseData.data ? responseData.data : {});
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
        !!marks && 
        <div className="requestsC ontainer">
        <TableContainer component={Paper} className="tableContainer">
            <Table aria-label="collapsible table" >
                <TableHead>
                
                <TableRow sx={{borderBottom:"solid #99A799"}}>
                    <TableCell><img width="60" height={"60"} src={ratingIcon}></img> </TableCell>
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
                            Mark
                        </Typography></TableCell>
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
                {marks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    
                    <Row key={row.id} row={row} setRequests={setMarks} marks={marks}/>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={marks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {marks.length === 0 && <Typography variant="h6" sx={{color:"#CC7351"}}>There are currently no registration requests</Typography>}
    </div>
    )
}


export default NotApprovedMarks;