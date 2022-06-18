import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {getBusinessReportData} from '../../../services/AdminService'
import "../attendanceSchedule/Graph.scss";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import OfferIncomesAdminReport from './OffersIncomesAdminReport';
import adventureIcon from '../../../adventure.png';
import cottageIcon from '../../../cottage.png';
import shipIcon from '../../../ship.png';

function IncomeStatementAdmin(){
    
    const [businessData, setBusinessData] = useState();
    const [valueStartDate, setValueStartDate] = React.useState(new Date());
    const [valueEndDate, setValueEndDate] = React.useState(new Date());

    function setReportData(){
        async function setData(){
            const response = await getBusinessReportData(valueStartDate, valueEndDate);
            setBusinessData(!!response.data ? response.data : {});

        }
        setData();

    }

    function checkDate() {
        const currentDate = new Date();
        if (valueStartDate >= currentDate || valueEndDate >= currentDate) {
          toast.error("Invalid date, try again!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
          });
          return false;
        }
        if (valueEndDate <= valueStartDate) {
          toast.error("Invalid date, try again!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
          });
          return false;
        }
        return true;
      }

      function handleIncomeStatement() {
        if (checkDate()) {
            setReportData();
        }
      }
    
      const handleStartDateReport = (newValue) => {
        setValueStartDate(newValue);
        setBusinessData([]);
        
      };
    
      const handleEndDateReport = (newValue) => {
        setValueEndDate(newValue);
        setBusinessData([]);
       
      };
    
    return (
        <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <p
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            fontSize: "30px",
            color: "#CC7351",
          }}
        >
          Bussines report <AccessTimeIcon />
        </p>
        <Divider />
        <br />
        <Typography variant='body1' sx={{color: "#5f6d5f"}}>
            Choose period for report
        </Typography>
       
        <br />
        <Box sx={{ flexGrow: 1 }}>
          <Grid item xs={12}>
            <div className="graphBtn">
              <DesktopDatePicker
                label="Start date*"
                inputFormat="yyyy-MM-dd"
                value={valueStartDate}
                required
                onChange={handleStartDateReport}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="graphBtn">
              <DesktopDatePicker
                label="End date*"
                inputFormat="yyyy-MM-dd"
                value={valueEndDate}
                required
                onChange={handleEndDateReport}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="graphBtn">
              <Button
                size="midle"
                variant="outlined"
                bgcolor="secondary"
                color="primary"
                onClick={handleIncomeStatement}
              >
                Report
              </Button>
            </div>
          </Grid>
        </Box>

        <div style={{ height: "50px", width: "1000px" }}>{!!businessData &&
        
        <div> 
         <br></br>
          <Typography variant='h6' sx={{marginLeft:"3%", color:"#CC7351"}}>
          <img src={cottageIcon} />
          {"\t\t"} Cottages
          </Typography>
          <OfferIncomesAdminReport  offerList={businessData.cottagesIncome}/>
          <Typography variant='h6' sx={{marginLeft:"3%", color:"#CC7351"}}>
          <img src={shipIcon} />
          {"\t\t"} Ships
          </Typography>
          <OfferIncomesAdminReport  offerList={businessData.shipsIncome}/>
          <Typography variant='h6' sx={{marginLeft:"3%", color:"#CC7351"}}>
          <img src={adventureIcon} />
          {"\t\t"}  Adventures
          </Typography>
          <OfferIncomesAdminReport  offerList={businessData.adventuresIncome}/>
          <div className='totalPrice' >
              Total: {businessData.totalIncome} €
          </div>
          <br></br>
          <br></br>
        </div>
      }</div>
      </LocalizationProvider>
    </div>
    );
}

export default IncomeStatementAdmin;