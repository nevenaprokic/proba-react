import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import "./WorkingCalendar.scss";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import CalendarSidebar from './CalendarSidebar';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import { getUsernameFromToken, getRoleFromToken } from "../../app/jwtTokenUtils";
import { getAdventureByInstructorEmail } from '../../services/AdventureService';
import ReservationDetails from './ReservationDetails';
import Modal from '@mui/material/Modal';
import AddUnavailableOfferDates from './AddUnavailableOfferDates';
import QuickActionDetails from './QuickActionDetails';
import { userType } from '../../app/Enum';
import { getCottageByCottageOwnerEmail } from '../../services/CottageService';
import { getShipByShipOwnerEmail } from '../../services/ShipService';


export default function WorkingCalendar({offers, setOffers}){


  const [state, setState] = useState();
  const [offersName, setOffersName] = useState();
  const [events, setEvents] = useState();
  const [openChangeForm, setOpenForm] = useState(false);
  const [openUnavailableDatesForm, setUnavailableDatesForm] = useState(false);
  const [reservationId, setReservationId] = useState();
  const [offerName, setOfferName] = useState();
  const [offerId, setOfferId] = useState();
  const [selectedDates, setSelectedDates] = useState();
  const [actionId, setActionId] = useState();
  const [openActionDetails, setOpenActionDetails] = useState(false);

  function handleOpenForm(){setOpenForm(true)}
  function handleCloseForm(){
      setOpenForm(false);
  }

  function handleOpenUnavailableDatesForm() {
    setUnavailableDatesForm(true)
  }
  function handleCLoseUnavailableDatesForm() {setUnavailableDatesForm(false)}

  function handleOpenActionDetails() {
    setOpenActionDetails(true);
  }

  function handleCloseActionDetails(){
    setOpenActionDetails(false);
  }


  function findEvent(id){
    let foundedEvent = {}
    events.forEach(element => {
        if(element["id"] == id){
          foundedEvent = element;
          
        }
    });
    return foundedEvent;
  }

  useEffect(() => {
    let s = {
      weekendsVisible: true,
      currentEvents: []
    }
    setState(s);

    const usersOffers = {
      [userType.INSTRUCTOR] : getAdventureByInstructorEmail,
      [userType.COTTAGE_OWNER] : getCottageByCottageOwnerEmail,
      [userType.SHIP_OWNER] : getShipByShipOwnerEmail,
    }

    async function setData() {
      let username = getUsernameFromToken();
      const offersData = await usersOffers[getRoleFromToken()](username);
      setOffers(!!offersData ? offersData.data : {});     
      setEvents([]);
      const offersNameList = []
      offers.forEach(offer => {
        let name = offer.name ? offer.name : offer.offerName;
        offersNameList.push({ label: name, id: offer.id});
      });
      setOffersName(offersNameList);
    return offersData;    
    }
    setData();
  
}, [])

  const handleDateSelect = (selectInfo) => {
    let viewType = selectInfo.view.type;
    if(viewType == "timeGridWeek" || viewType == "timeGridDay"){
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect()
      alert("Select option is available onlly on monty view");

    }
    else{
      console.log("select", selectInfo);
      setSelectedDates(selectInfo);
      handleOpenUnavailableDatesForm(selectInfo);

     }
  }

  const handleEventClick = (clickInfo) => {
    if (true) {//dodati popup za da li ste sigurni
      async function set(){
        let id = clickInfo.event.id;//currentViewType
        let event = findEvent(id);
        console.log(event);

        if(event.isReservation){
          
          setReservationId(event.application_id);
          handleOpenForm();
        }
        else if(event.isAction){
          setActionId(event.application_id);
          handleOpenActionDetails();
        }
                
      }
      set();
      
    }
  }

  const handleEvents = (events) => {
    setState({
      currentEvents: events
    })
  }
    

    return (
      !!offers && !!events &&
      <div className='demo-app'>
        {console.log("events", events)}
        <CalendarSidebar state={state} offers={offersName} event={events} setEvents={setEvents} setOfferId={setOfferId} setOfferName={setOfferName}/>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
              
            }}
            initialView='dayGridMonth'
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={events} 
            select={handleDateSelect}
            eventContent={renderEventContent} 
            eventClick={handleEventClick}
            eventsSet={handleEvents} 
          />
          
        </div>
        <Modal
            open={openChangeForm}
            onClose={handleCloseForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backgroundColor:"rgb(218, 224, 210, 0.6)", overflow:"auto"}}
        >
                <ReservationDetails reservationId={reservationId} setReservationId={setReservationId} close={handleCloseForm}/>
            
        </Modal>
        <Modal
            open={openUnavailableDatesForm}
            onClose={handleCLoseUnavailableDatesForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backgroundColor:"rgb(218, 224, 210, 0.6)", overflow:"auto"}}
        >
                <AddUnavailableOfferDates offerId={offerId} offerName={offerName} close={handleCLoseUnavailableDatesForm} selectedDates={selectedDates}/>
            
        </Modal>
        <Modal
            open={openActionDetails}
            onClose={handleCloseActionDetails}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backgroundColor:"rgb(218, 224, 210, 0.6)", overflow:"auto"}}
        >
                <QuickActionDetails actionId={actionId} setActionId={setActionId} close={handleCloseActionDetails}/>
            
        </Modal>
      </div>
    )
  }


function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}


