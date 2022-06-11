import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {addDays} from '../../../../services/UtilService';

export default function Review({reservation, checked}) {


  let totalPrice = parseInt(reservation.price) * parseInt(reservation.daysReservation);
  if(checked.length != 0 ){
    checked.map((additional) => {totalPrice+= parseInt(additional.servicePrice)});
  }
  let startDateReservation = new Date(reservation.startDateReservation);
  let endDateReservation = addDays(new Date(reservation.startDateReservation), reservation.daysReservation);
  let startDateReservationString = startDateReservation.getDate() + "/" + (startDateReservation.getMonth()+1) + "/" +startDateReservation.getFullYear();
  let endDateReservationString = endDateReservation.getDate() + "/" + (endDateReservation.getMonth()+1) + "/" +endDateReservation.getFullYear();

  const payments = [
    { name: 'Start date reservation: ', detail: startDateReservationString},
    { name: 'End date reservation: ', detail: endDateReservationString},
  ];
  reservation.price = (totalPrice - (totalPrice*reservation.discount/100));

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom color={"#CC7351"}>
        Reservation summary
      </Typography>
      <List disablePadding>
          <ListItem key={"Offer price"} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Offer price"} />
            <Typography variant="body2">{reservation.daysReservation + "x" + reservation.price + "€"}</Typography>
          </ListItem>
          {(checked.length != 0) ? (checked.map((product) => (
          <ListItem key={product.serviceName} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.serviceName} />
            <Typography variant="body2">{product.servicePrice + "€"}</Typography>
          </ListItem>
        ))) : (
          <></>
        ) }

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Price" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalPrice}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Discount" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            { reservation.discount +"% " }
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {(totalPrice - (totalPrice*reservation.discount/100))+"€"}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }} color={"#CC7351"}>
            Offer
          </Typography>
          <Typography gutterBottom>{'Name: ' + reservation.offerName}</Typography>
          <Typography gutterBottom>{'Number of guests: ' + reservation.peopleNum}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }} color={"#CC7351"}>
            Client
          </Typography>
          <Typography gutterBottom>{'Name and surname: ' + reservation.clientName + " "+ reservation.clientLastName}</Typography>
          <Typography gutterBottom>{'User name: ' + reservation.clientUserName}</Typography>
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