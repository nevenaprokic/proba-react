import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {addDays} from '../../../../services/UtilService';



export default function Review({offer, additionalServicesInputList}) {

  let price = offer.price + '€';
  let totalPrice = parseInt(offer.price) * parseInt(offer.daysReservation);
  if(additionalServicesInputList.length != 1 && additionalServicesInputList[0].servicePrice !== ''){
    additionalServicesInputList.map((additional) => {totalPrice+= parseInt(additional.servicePrice)});
  }
  

  let startDateAction = new Date(offer.startDateAction);
  let startDateReservation = new Date(offer.startDateReservation);
  let endDateAction = addDays(new Date(offer.startDateAction), offer.daysAction);
  let endDateReservation = addDays(new Date(offer.startDateReservation), offer.daysReservation);


  let startDateActionString = startDateAction.getDate() + "/" + (startDateAction.getMonth()+1) + "/" +startDateAction.getFullYear();
  let endDateActionString = endDateAction.getDate() + "/" + (endDateAction.getMonth()+1) + "/" +endDateAction.getFullYear();
  let startDateReservationString = startDateReservation.getDate() + "/" + (startDateReservation.getMonth()+1) + "/" +startDateReservation.getFullYear();
  let endDateReservationString = endDateReservation.getDate() + "/" + (endDateReservation.getMonth()+1) + "/" +endDateReservation.getFullYear();
  
  const payments = [
    { name: 'Start date action: ', detail: startDateActionString },
    { name: 'End date action: ', detail: endDateActionString },
    { name: 'Start date reservation: ', detail: startDateReservationString},
    { name: 'End date reservation: ', detail: endDateReservationString},
  ];
 
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom color={"#CC7351"}>
        Quick reservation summary
      </Typography>
      <List disablePadding>
          <ListItem key={"Offer price"} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Offer price"} />
            <Typography variant="body2">{offer.daysReservation + "x" + offer.price + "€"}</Typography>
          </ListItem>
          {(additionalServicesInputList.length != 0) && (additionalServicesInputList[0].servicePrice !== '') ? (additionalServicesInputList.map((product) => (
          <ListItem key={product.serviceName} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.serviceName} />
            <Typography variant="body2">{product.servicePrice + "€"}</Typography>
          </ListItem>
        ))) : (
          <></>
        ) }

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalPrice + "€"}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }} color={"#CC7351"}>
            Offer
          </Typography>
          <Typography gutterBottom>{'Name: ' + offer.name}</Typography>
          <Typography gutterBottom>{'Number of guests: ' + offer.peopleNum}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={5}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }} color={"#CC7351"}>
            Date
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={7}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}