import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from "@mui/material";
import { useEffect } from 'react';
import { useForm, useWatch } from "react-hook-form";
import "../../../style/ReservationForm.scss"
import BoyIcon from '@mui/icons-material/Boy';
import NumbersIcon from '@mui/icons-material/Numbers';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EuroIcon from '@mui/icons-material/Euro';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import { calculatePrice } from '../../../services/ReservationService';
import { makeReservation } from '../../../services/ReservationService';
import ClearIcon from '@mui/icons-material/Clear';
import { addDaysToDate } from '../../../services/UtilService';

export default function ReservationForm({ offer, close }) {
    const { register, getValues, handleSubmit, formState: { errors }, watch } = useForm({});
    const [value, setValue] = React.useState(new Date());
    const [checked, setChecked] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    const recalculate = (services) => {
      services = (services != null) ? services : checked;        
      let newPrice = calculatePrice(getValues("days"), offer.price, services, getValues("guests"));
      setTotal(newPrice);
    };

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
      recalculate(newChecked);
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const onSubmit = (e) => {
      let next_date = addDaysToDate(value, e.days);
      let params = {...e, "offerId": offer.id, "services":checked, "endingDate":next_date.toISOString().split('T')[0], "total": total, "date": value };
      makeReservation(params, close);
    };

    useEffect(() => {
        console.log(offer);
        const subscription = watch((data) => {
          recalculate();
        });
        return () => {
          subscription.unsubscribe();
        }
    }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="formContainer">
        <Typography variant="h6" gutterBottom>
            Standard reservation
        </Typography>
        <Typography gutterBottom>
            <label className="headerText">Fields marked with an asterisk (*) are required.</label>
        </Typography>
        <Grid container spacing={3} component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{marginTop:"2%"}}>
                <Grid item xs={12} sm={4}>            
                <DesktopDatePicker
                    label="Starting date*"
                    inputFormat="yyyy-MM-dd"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    // {...register("date", {required: true})}
                    />
                {errors.offerName && <label className="requiredLabel">Required! </label>}
                </Grid>

                <Grid item xs={12} sm={4} >
                <TextField
                    id="days"
                    name= 'second'
                    label="Number of days"
                    type="number"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    fullWidth
                    required
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><NumbersIcon /></InputAdornment>,
                    }}
                    {...register("days", {required: true, pattern:/^[1-9]+[0-9]*$/})}
                    
                />
                {errors.days && <label className="requiredLabel">Required! Only positive numbers are allowed.</label>}
                </Grid>
                
                
                <Grid item xs={12} sm={4}>
                <TextField 
                    fullWidth
                    label="Number of guests"
                    id="guests"
                    type="number"
                    required
                    InputProps={{
                    startAdornment: <InputAdornment position="start"><BoyIcon /></InputAdornment>,
                    }}
                    {...register("guests", {required: true, pattern:/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/})}
                />
                {errors.guests && <label className="requiredLabel">Required! Only positive numbers are allowed.</label>}
                </Grid>
                <Grid item xs={12}>
                {(offer.additionalServices.length == 0) ? (
                  <Typography variant="h6" gutterBottom>
                    No additional services <ClearIcon style={{ verticalAlign: '-6' }}/>
                  </Typography>
                  ) : (
                  <>
                    <Typography variant="h7" gutterBottom>
                    Additional services <AddCircleIcon style={{ verticalAlign: '-6' }}/>
                  </Typography>
                    
                <List sx={{ width: '60%', bgcolor: 'background.paper' }}>
                  {offer.additionalServices.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem
                        key={value.name + offer.id}
                        secondaryAction={
                          <IconButton edge="end" aria-label="comments">
                          </IconButton>
                        }
                        disablePadding
                      >
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                              />
                      </ListItemIcon>
                    <ListItemText id={labelId} secondary={`${value.serviceName}`} /><ListItemText className="list-item" id={labelId} primary={` ${value.servicePrice}€`} />
                  </ListItemButton>
                    </ListItem>
                    );
                  })}
                </List>
                  </>
                )}
                </Grid>
                <Grid item xs={12} sm={4} sx={{marginLeft:"35%"}}>
                    <br/>
                    <Button 
                        type="submit"
                        variant="contained"
                        sx={{float:"right"}}
                        color="success"
                        fullWidth
                        onClick={handleSubmit}
                    >
                    Confirm 
                    </Button>
                </Grid>
                <Typography variant="h7" gutterBottom>
                    Total Price: {total} <EuroIcon  style={{ verticalAlign: '-6' }}/>
                </Typography>
            </Grid>
        </div>
    </LocalizationProvider>
  )
}

