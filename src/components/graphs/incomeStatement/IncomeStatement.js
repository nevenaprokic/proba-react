import { useState } from "react";
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
import {
  getRoleFromToken,
  getUsernameFromToken,
} from "../../../app/jwtTokenUtils";
import Review from "./Review";
import {
  reviewReport,
  reviewReportAdventure,
  reviewReportShip,
} from "../../../services/ReservationService";
import { userType } from "../../../app/Enum";

function IncomeStatement() {
  const [report, setReport] = useState([]);
  const [valueStartDate, setValueStartDate] = React.useState(new Date());
  const [valueEndDate, setValueEndDate] = React.useState(new Date());
  const [reportData, setReportData] = React.useState();

  let getReportByOwnerEmail = {
    [userType.COTTAGE_OWNER]: reviewReport,
    [userType.INSTRUCTOR]: reviewReportAdventure,
    [userType.SHIP_OWNER]: reviewReportShip,
  };

  React.useEffect(() => {
    handleStartDateReport(new Date());
    handleEndDateReport(new Date());
  }, []);

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
  function getData() {
    async function setCheck() {
      let username = getUsernameFromToken();
      let role = getRoleFromToken();
      const data = await getReportByOwnerEmail[role](
        valueStartDate,
        valueEndDate,
        username
      );
      setReportData(!!data ? data.data : {});
      return data;
    }
    setCheck();
  }
  function handleIncomeStatement() {
    if (checkDate()) {
      getData();
    }
  }

  const handleStartDateReport = (newValue) => {
    setValueStartDate(newValue);
    setReport([]);
  };

  const handleEndDateReport = (newValue) => {
    setValueEndDate(newValue);
    setReport([]);
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

        <div style={{ height: "50px", width: "1000px" }}>
          {!!reportData ?(
            <div>
              <Review
                data={reportData}
                startDate={valueStartDate}
                endDate={valueEndDate}
              />
            </div>
          ):<></>}
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default IncomeStatement;
