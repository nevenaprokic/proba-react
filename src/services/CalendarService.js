import api from "../app/api";
import { getUsernameFromToken } from "../app/jwtTokenUtils";
import { toast } from "react-toastify";

let eventId = 0;

export function getCalendarEvents(offerId, setEvents){
    let username = getUsernameFromToken();
    return api
    .get("/calendar/info", {
        params:{
            ownerEmail: username,
            offerId: offerId
        }
    })
    .then((responseData) => responseData)
    .catch((err) => {toast.error("Something went wrong.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                });
            });
}

export function generateCalendarEvents(evetns){
   
    const calendarEvents = []
    eventId = 0;
    evetns.forEach(event => {
        calendarEvents.push(
            {
                id: createEventId(),
                title: event.title,
                start: event.startDate,
                end: event.endDate + "T23:59:00",
                application_id: event.id,
                isReservation: event.reservation,
                isAction: event.action

            }
        )
    });
    return calendarEvents;
}


export function createEventId() {
  return String(eventId++)
}


export function getReservationDetails(reservationId){
    return api
    .get("calendar/reservation-info", {
        params:{
            reservationId: reservationId
        }
    })
    .then((responseData) => responseData)
    .catch((err) => {toast.error("Something went wrong.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                });
}

export function addOffersUnavailableDates(offerId, selectInfo){
    let  data = {
        offerId: offerId, 
        startDate: selectInfo.startStr, 
        endDate: selectInfo.endStr
    }

    return api
    .post("/calendar/add-unavailable-dates", data)
    .then(
        (responseData) => {
                        renderEvent(selectInfo)
                        toast.success("Successfully added new unavailable interval", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                    return true;
                })
    .catch((err) => { 
            toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                });
                return false;
            } )
}

export function getQuickActionDetails(actionId){
    return api
    .get("calendar/action-info", {
        params:{
            actionId: actionId
        }
    })
    .then((responseData) => responseData)
    .catch((err) => {toast.error("Something went wrong.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                });
}

function renderEvent(selectInfo){
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection
    let title = "Unavailable";

    calendarApi.addEvent({
    id: createEventId(),
    title,
    start: selectInfo.startStr,
    end: selectInfo.endStr,
    allDay: selectInfo.allDay
    })
}

