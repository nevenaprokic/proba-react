import { useEffect, useState } from "react";
import "./Graph.scss";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import AttendanceReportYearly from "./AttendanceScheduleYearly";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import AttendanceReportMonthly from './AttendanceScheduleMonthly';
import AttendanceReportWeekly from './AttendanceScheduleWeekly';

function HomePageGraph() {
  const [graph, setGraph] = useState([]);
  const [valueDate, setValueDate] = React.useState(new Date());

  useEffect(() => {
    handleChangeReservationDate(new Date());

  }, [])

  function handleYearlyAttendanceReport() {
    setGraph([]);
    setGraph(
      graph.concat(
        <div>
          <AttendanceReportYearly value={valueDate}/>
        </div>
      )
    );
  }
  function handleMonthlyAttendanceReport() {
    setGraph([]);
    setGraph(
      graph.concat(
        <div>
          <AttendanceReportMonthly value={valueDate}/>
        </div>
      )
    );
  }
  function handleWeeklyAttendanceReport() {
    setGraph([]);
    setGraph(
      graph.concat(
        <div >
          <AttendanceReportWeekly value={valueDate}/>
        </div>
      )
    );
    
  }
  const handleChangeReservationDate = (newValue) => {
    let month = (newValue.getMonth()+1);
    let day = newValue.getDate();
    if(month.toString().length === 1)
      month = "0" + month;
    if(day.toString().length === 1)
      day = "0"+day;
    let date =newValue.getFullYear() + "-" +month + "-" +day;
    setValueDate(date);
    setGraph([]);
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
            Period <AccessTimeIcon />
          </p>
          <Divider />
          <br />
          <Box sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
                <DesktopDatePicker
                  label="Starting date*"
                  inputFormat="yyyy-MM-dd"
                  value={valueDate}
                  required
                  onChange={handleChangeReservationDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              <div className="graphBtn">
                <Button
                  size="midle"
                  variant="outlined"
                  bgcolor="secondary"
                  color="primary"
                  onClick={handleYearlyAttendanceReport}
                >
                  Yearly report
                </Button>
              </div>
              <div className="graphBtn">
                <Button
                  size="midle"
                  variant="outlined"
                  bgcolor="secondary"
                  color="primary"
                  onClick={handleMonthlyAttendanceReport}
                >
                  Monthly report
                </Button>
              </div>
              <div className="graphBtn">
                <Button
                  size="midle"
                  variant="outlined"
                  bgcolor="secondary"
                  color="primary"
                  onClick={handleWeeklyAttendanceReport}
                >
                  Weekly report
                </Button>
              </div>
            </Grid>
          </Box>
          
          <div style={{ height:'50px', width:'1000px'}}>{graph}</div>
          </LocalizationProvider>
        </div>
  );
}

export default HomePageGraph;
