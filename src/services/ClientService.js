import api from "../app/api";
import { getUsernameFromToken } from "../app/jwtTokenUtils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const sendDeleteRequestClient = (data) => {
    console.log(data);
    api
      .post("client/delete-account", { ...data,
          "email": getUsernameFromToken(),
        })
      .then((res) => {
          toast.success( res.data, {position: toast.POSITION.BOTTOM_RIGHT, autoClose:1500});
      })
      .catch((err) => {
        toast.error( err.response.data , {position: toast.POSITION.BOTTOM_RIGHT, autoClose:1500});
      });
}

export const isDeletionRequested = (handleOpenDelete) => {
  let deleted = false;
  api
      .get("/client/deletion-requested?email=" + getUsernameFromToken())
      .then((res) => {
          deleted = res.data;
          if(!deleted)
            handleOpenDelete();
          else{
            toast.error( "You have already requested deletion.", {position: toast.POSITION.BOTTOM_RIGHT, autoClose:1500});
          }
      })
      .catch((err) => {
        toast.error( "Something went wrong." , {position: toast.POSITION.BOTTOM_RIGHT, autoClose:1500});
      });
}


export function getClientByCottageOwnerEmail(email){
  return api
    .get("/client/get-by-reservation-cottage", {
      params: {
        ownerEmail: email,
      },
    })
    .then((response) => {console.log(response.data);  return response.data;})
    .catch((err) => {
      toast.error(
        "Somethnig went wrong. Please wait a fiew seconds and try again.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        }
      );
    });
}
export function getClientByShipOwnerEmail(email){
  return api
    .get("/client/get-by-reservation-ship", {
      params: {
        ownerEmail: email,
      },
    })
    .then((response) => {console.log(response.data);  return response.data;})
    .catch((err) => {
      toast.error(
        "Somethnig went wrong. Please wait a fiew seconds and try again.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        }
      );
    });
}
export function getClientByInstructorEmail(email){
  return api
    .get("/client/get-by-reservation-adventure", {
      params: {
        ownerEmail: email,
      },
    })
    .then((response) => {console.log(response.data);  return response.data;})
    .catch((err) => {
      toast.error(
        "Somethnig went wrong. Please wait a fiew seconds and try again.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        }
      );
    });
}
export function isAvailableClient(emailClient, startDateReservation, endDateReservation){
  return api
    .get("client/available-client", {
      params: {
        emailClient: emailClient,
        startDateReservation: startDateReservation,
        endDateReservation: endDateReservation,
      },
    })
    .then((data) => {
      console.log("DA LI JE DOZVOLJENO");
      console.log(data.data);
      return data.data;
    })
    .catch((err) => {
      console.log("Nije uspesno dobavljeno");
      return err.message;
    });
  }

export function getAllCottageReservationsClient(){
  let email = getUsernameFromToken();

  return api
  .get("/reservation/get-cottage-reservations-by-client", {
      params: {
          email: email
      },
    })
  .then((responseData) => responseData)
  .catch((err) => {toast.error(err.response.data, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 1500,
                  })}
      )
}

export function getAllShipReservationsClient(){
  let email = getUsernameFromToken();

  return api
  .get("/reservation/get-ship-reservations-by-client", {
      params: {
          email: email
      },
    })
  .then((responseData) => responseData)
  .catch((err) => {toast.error(err.response.data, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 1500,
                  })}
      )
}

export function getAllAdventureReservationsClient(){
  let email = getUsernameFromToken();

  return api
  .get("/reservation/get-adventure-reservations-by-client", {
      params: {
          email: email
      },
    })
  .then((responseData) => responseData)
  .catch((err) => {toast.error(err.response.data, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 1500,
                  })}
      )

}

export function isAllowedToMakeReservation(setCanReserve){
  let email = getUsernameFromToken();
  if(email == null) return false;
  return api.get("client/is-allowed-to-reserve" ,
    {params:{ email : email}})
    .then(response => setCanReserve(response.data))
    .catch((err) => {toast.error(err.response.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
      })
    });
}

export function makeReviewForOffer(stars, reservationId, comment){
    let email = getUsernameFromToken();
    api
    .put("client/make-review", {
        "email": email,
        "stars": stars,
        "reservationId": reservationId,
        "comment": comment
      })
    .then((res) => {
        toast.success( res.data, {position: toast.POSITION.BOTTOM_RIGHT, autoClose:1500});
    })
    .catch((err) => {
      toast.error( err.response.data , {position: toast.POSITION.BOTTOM_RIGHT, autoClose:1500});
    });
}

export function getSubscriptions(){
  let email = getUsernameFromToken();
  return api.get("client/get-subscriptions/" + email)
  .then(response => response.data)
  .catch((err) => {toast.error(err.response.data, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 1500,
    })
  });
}

export function unsubscribe(offerId){
  let email = getUsernameFromToken();
  return api.post("client/unsubscribe", {
      email: email,
      offerId: offerId
  })
  .then(response => response.data)
  .catch((err) => {toast.error(err.response.data, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 1500,
    })
  });
}

export function subscribe(offerId){
  let email = getUsernameFromToken();
  return api.post("client/subscribe", {
      email: email,
      offerId: offerId
  })
  .then(response => response.data)
  .catch((err) => {toast.error(err.response.data, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 1500,
    })
  });
}

export function isSubscribed(offerId, setSubscribed){
  let email = getUsernameFromToken();
  return api.get("client/is-subscribed" ,
  {params:{
     email : email,
      offerId:offerId
  }})
  .then(response => { console.log(response); setSubscribed(response.data); })
  .catch((err) => {toast.error(err.response.data, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 1500,
    })
  });
}

export function makeComplaintForOffer(reservationId, comment){
  let email = getUsernameFromToken();
  api
  .put("client/make-complaint", {
      "email" : email,
      "reservationId": reservationId,
      "comment": comment
    })
  .then((res) => {
      toast.success( res.data, {position: toast.POSITION.BOTTOM_RIGHT, autoClose:1500});
  })
  .catch((err) => {
    toast.error( err.response.data , {position: toast.POSITION.BOTTOM_RIGHT, autoClose:1500});
  });
}
