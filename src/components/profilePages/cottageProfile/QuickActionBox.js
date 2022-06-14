import { Button } from "@mui/material";
import { getRoleFromToken } from "../../../app/jwtTokenUtils";
import "./CottageProfilePage.scss";
import { userType } from "../../../app/Enum";
import * as React from "react";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { getQuickActionByOfferId } from "../../../services/QuickActionService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  makeReservation,
  convertParams,
} from "../../../services/ReservationService";
import ConfirmDialog from "../../layout/ConfirmDialog";
import { isAllowedToMakeReservation } from "../../../services/ClientService";

function QuickActionBox({ offer }) {
  const [quickActionData, setQuickActionsData] = useState();
  const [canReserve, setCanReserve] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReservation = (action) => {
    makeReservation(convertParams(action, offer.id), handleClose);
  };

  useEffect(() => {
    async function setData() {
      let role = getRoleFromToken();
      if (userType.CLIENT == role) isAllowedToMakeReservation(setCanReserve);
      let quickActions = await getQuickActionByOfferId(offer.id);
      setQuickActionsData(!!quickActions ? quickActions.data : {});
      return quickActions;
    }
    setData();
  }, []);

  if (!!quickActionData) {
    return (
      <div className="specialOffersContainer">
        <div className="specialOffersTitle">
          <label className="tittle">Special offers:</label>
          <hr className="tittleLine"></hr>
        </div>

        <div className="specialOfferSrollBox">
          {quickActionData.length != 0 ? (
            <>
              {quickActionData.map((action) => {
                console.log(quickActionData);
                let startDate =
                  " " +
                  action.startDate[2] +
                  "." +
                  action.startDate[1] +
                  "." +
                  action.startDate[0] +
                  ".";
                let endDate =
                  " " +
                  action.endDate[2] +
                  "." +
                  action.endDate[1] +
                  "." +
                  action.endDate[0] +
                  ".";
                let startDateAction =
                  " " +
                  action.startDateAction[2] +
                  "." +
                  action.startDateAction[1] +
                  "." +
                  action.startDateAction[0] +
                  ".";
                let endDateAction =
                  " " +
                  action.endDateAction[2] +
                  "." +
                  action.endDateAction[1] +
                  "." +
                  action.endDateAction[0] +
                  ".";
                return (
                  <div className="scolledItemsContainer">
                    <h3 className="actionTittle">
                      Date of stay :{startDate} {" - "} {endDate}
                    </h3>
                    <div>
                      <label className="stayDate">
                        Maximum number of people: {action.numberOfPerson}
                      </label>

                      <div>
                        {action.additionalServices.length == 0 ? (
                          <label>No additional services for this offer</label>
                        ) : (
                          <label>
                            Additional services: {action.additionalServices}
                          </label>
                        )}
                      </div>
                      <br />
                      <div className="availableDate">
                        <label>
                          {" "}
                          <CalendarMonthIcon
                            style={{ verticalAlign: "-6" }}
                          />{" "}
                          Action available:{" "}
                        </label>
                        <label>
                          {startDateAction} {" - "} {endDateAction}
                        </label>
                      </div>
                    </div>
                    <br></br>
                    <label className="priceItem">Price: {action.price} €</label>
                    {getRoleFromToken() == userType.CLIENT && (
                      <Button
                        className="bookingButton"
                        size="small"
                        variant="contained"
                        bgcolor="secondary"
                        color="primary"
                        disabled={!canReserve}
                        onClick={() => handleOpen()}
                      >
                        Book now
                      </Button>
                    )}
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)" }}
                    >
                      <ConfirmDialog
                        close={handleClose}
                        cb={() => handleReservation(action)}
                        actionData={quickActionData[0]}
                        offerData={offer}
                      ></ConfirmDialog>
                    </Modal>

                    <hr className="line"></hr>
                  </div>
                );
              })}
            </>
          ) : (
            <h3 className="actionTittle"> There are no special offers. </h3>
          )}
        </div>
      </div>
    );
  } else return null;
}

export default QuickActionBox;
