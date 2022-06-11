import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import NumbersIcon from "@mui/icons-material/Numbers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { userType } from "../../../../app/Enum";


export default function FirstPage({offers, setOffer, role }) {
  const [valueAction, setValueAction] = React.useState(new Date());
  const [valueReservation, setValueReservation] = React.useState(new Date());

  const handlerOfferChange = (event, selectedOffer) => {
    let currentOffer = offers.find((offer)=> offer.name === selectedOffer);
    if(role === userType.INSTRUCTOR)
       currentOffer = offers.find((offer)=> offer.offerName === selectedOffer);
      setOffer(prevState => {
        return{...prevState, offerId:currentOffer.id}
      })
    setOffer(prevState => {
      return{...prevState, name:selectedOffer}
    })
  };

  React.useEffect(() => {
      handleChangeActionDate(new Date());
      
  }, [])

  const handleChangeActionDate = (newValue) => {
    setValueAction(newValue);
    let month = (newValue.getMonth()+1);
    let day = newValue.getDate();
    if(month.toString().length === 1)
      month = "0"+month;
    if(day.toString().length === 1)
      day = "0"+day;
    let date = newValue.getFullYear()+ "-" +month + "-" +day;
    console.log(date);
    setOffer(prevState => {
      return{...prevState, startDateAction:date}
    })
  };
  const handleChangeReservationDate = (newValue) => {
    let month = (newValue.getMonth()+1);
    let day = newValue.getDate();
    if(month.toString().length === 1)
      month = "0" + month;
    if(day.toString().length === 1)
      day = "0"+day;
    let date =newValue.getFullYear() + "-" +month + "-" +day;
    setValueReservation(newValue);
    setOffer(prevState => {
      return{...prevState, startDateReservation:date}
    })
  };
  const handleChangeNumberAction = (e) => {
    setOffer(prevState => {
      return{...prevState, daysAction:e.target.value}
    })
  };
  const handleChangeNumberReservation = (e) => {
    setOffer(prevState => {
      return{...prevState, daysReservation:e.target.value}
    })
    
  };

  return (
    !!offers && 
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid item xs={12}>
                <label style={{ marginLeft: "35%", color:"#CC7351" , fontSize:"22px" }}>Special offer</label>
            </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={userType.INSTRUCTOR == role ? offers.map((offer)=> offer.offerName): offers.map((offer)=> offer.name)}
              required
              sx={{ width: 300, marginLeft: "25%", marginTop:"2%" }}
              onChange={(event, newValue) => {
                handlerOfferChange(event, newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Offer*" />}
            />
          </Grid>
          <Grid item xs={12}>
                <label style={{ marginLeft: "35%" , color:"#CC7351", fontSize:"22px" }}> Period of action</label>
            </Grid>
          <Grid item xs={12} sm={6}>
          <div style={{ marginLeft: "15%" }}>
            <DesktopDatePicker
              label="Starting date*"
              inputFormat="yyyy-MM-dd"
              value={valueAction}
              required
              fullWidth
              onChange={handleChangeActionDate}
              renderInput={(params) => <TextField {...params} />}
            />
            </div>
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              id="daysAction"
              name="secondAction"
              label="Number of days"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              onChange={handleChangeNumberAction}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
                <label style={{ marginLeft: "35%", color:"#CC7351" , fontSize:"22px" }}>  Reservation period</label>
            </Grid>
        
        <Grid item xs={12} sm={6}>
        <div style={{ marginLeft: "15%" }}>
          <DesktopDatePicker
            label="Starting date*"
            inputFormat="yyyy-MM-dd"
            value={valueReservation}
            required
            fullWidth
            onChange={handleChangeReservationDate}
            renderInput={(params) => <TextField {...params} />}
          />
          </div>
        </Grid>
        

        <Grid item xs={12} sm={5}>
          <TextField
            id="daysReservation"
            name="second"
            label="Number of days"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
            onChange={handleChangeNumberReservation}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        </Grid>
      </LocalizationProvider>
    </React.Fragment>
  );
}
