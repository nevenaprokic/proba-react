import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import "../../../style/ReportForm.scss";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {addReport} from '../../../services/ReservationService';
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';



export default function ReservationReportForm({closeForm, request}) {
  const { register, getValues, handleSubmit, formState: { errors }, watch } = useForm({});
  const [value, setValue] = React.useState(true);
  const [valueOpinion, setOpinionValue] = React.useState("POSITIVE");

  const handleChangeYes = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (event) => {
    setOpinionValue(event.target.value);
  };
  console.log(request);

  const onSubmit = (data) => {
    let params = {...data, 'clientId':request.clinetId, 'valueShowUp': value, 'valueImpression':valueOpinion, 'reservationId':request.id}
    console.log(params);
    addReport(params);
    closeForm(params);
  };

  function handleCancelClick(){
    closeForm();
  }

  
  const theme = createTheme({
    palette: {
      primary: { main:'#CC7351'},
      secondary: { main:'#99A799'},
    },

  });

  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3} component="form" noValidate onSubmit={handleSubmit(onSubmit)} >
      <div className="formContainer">
        <div className="closeBtn">
            <Button size="large" color="secondary" onClick={() => closeForm()}>
            x
            </Button>
        </div>
        <Typography variant="h6" gutterBottom>
          Report on the reservation made
        </Typography>

        <Typography gutterBottom>
          <label className="headerText">
            Fields marked with an asterisk (*) are required.
          </label>
        </Typography>
        <br></br>
        <Typography gutterBottom>
          <label className="question">Did the client show up? *</label>
        </Typography>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            id='showUp'
            onChange={handleChangeYes}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Typography gutterBottom>
          <label className="question">Impression of the client: *</label>
        </Typography>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            id="impression"
            value={valueOpinion}
            onChange={handleChange}
          >
            <FormControlLabel
              value={"POSITIVE"}
              control={<Radio />}
              label="Positive"
            />
            <FormControlLabel
              value={"NEGATIVE"}
              control={<Radio />}
              label="Negative"
            />
            <FormControlLabel
              value={"NO_IMPRESSION"}
              control={<Radio />}
              label="No impression"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <br />
        <Grid item xs={12}>
          <TextField
            id="comment"
            label="Comment"
            multiline
            rows={4}
            fullWidth
            defaultValue=""
            required
            {...register("comment", {required:true})}
          />
          {errors.comment && <label className="requiredLabel">Comment can't be empty</label>}
        </Grid>
        <div className={"reportFormBtnContainer"}>
          <br />
          <div className="reportFormBtn">
            <Button
              type="submit"
              variant="contained"
              sx={{ float: "right" }}
              color="success"
              fullWidth
            >
              Confirm
            </Button>
          </div>
          <div className="reportFormBtn">
            <Button
              type="submit"
              variant="contained"
              sx={{ float: "right" }}
              color="secondary"
              fullWidth
              onClick={() => handleCancelClick()}
            >
              Cancel
            </Button>
          </div>   
        </div>
        <Grid item xs={12} sm={3} sx={{}}>
          
        </Grid>
        </div>
        </Grid>
    </LocalizationProvider>
    </ThemeProvider>
  );
}
