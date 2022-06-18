import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import "./Income.scss";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FunctionsIcon from "@mui/icons-material/Functions";

export default function Review({ data, startDate, endDate }) {
  let startDateReport =
    startDate.getDate() +
    "/" +
    (startDate.getMonth() + 1) +
    "/" +
    startDate.getFullYear();
  let endDateReport =
    endDate.getDate() +
    "/" +
    (endDate.getMonth() + 1) +
    "/" +
    endDate.getFullYear();

  return (
    <div className="reviewContainer">
      <Typography variant="h5" gutterBottom color={"#CC7351"}>
        Income Statement <AttachFileIcon />
      </Typography>
      <Typography variant="h6" gutterBottom color={"#CC7351"}>
        {"Date:   " + startDateReport + "  -  " + endDateReport}
      </Typography>
      <Divider />
      <Divider />
      <Divider />

      {data.map((offer) =>
        offer.offerName !== "total" ? (
          <div>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mt: 2 }}
              color={"#CC7351"}
            >
              {offer.offerName}
            </Typography>
            <List disablePadding>
              <ListItem key={"Offer price"} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Number of reservation"} />
                <Typography variant="body2">
                  {offer.numberOfReservation}
                </Typography>
              </ListItem>

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {offer.totalPrice + "€"}
                </Typography>
              </ListItem>
            </List>
            <Divider />
          </div>
        ) : (
          <></>
        )
      )}

      <Divider />
      <Divider />
      <Divider />
      {data.map((offer) =>
        offer.offerName === "total" ? (
          <div>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ mt: 2 }}
              color={"#CC7351"}
            >
              Total <FunctionsIcon />
            </Typography>
            <List disablePadding>
              <ListItem key={"Offer price"} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Total number of reservation"} />
                <Typography variant="body">{offer.numberOfReservation}</Typography>
              </ListItem>
              <ListItem key={"Offer price"} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={"Total earnings"} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {offer.totalPrice+"€"}
                </Typography>
              </ListItem>
            </List>
          </div>
        ) : (
          <></>
        )
      )}
    </div>
  );
}