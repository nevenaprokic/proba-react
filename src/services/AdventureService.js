import api from "../app/api";
import {addAddtionalServices} from "./AdditionalServicesService";
import { getUsernameFromToken } from "../app/jwtTokenUtils";
import { toast } from "react-toastify";

export function getAdventureByInstructorEmail(username){
    return api
        .get("/adventure/instructor-adventures/" + username)
        .then((response) => response)
        .catch((err) => {toast.error(err.response.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    });
}

export function getAdventureById(id){
    return api
        .get("/adventure/details", {
            params:{
                id:id
            }
        })
        .then((data) => data)
        .catch((err) => {toast.error(err.response.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    });
}

export function checkUpdateAllowed(adventureData){
    console.log(adventureData);
        return api
    .get("/adventure/update-allowed/" + adventureData.ownerEmail + "/" + adventureData.id)
    .then((response) => response.data)
    .catch((err) => {
        toast.error("Somethnig went wrong. Please wait a fiew seconds and try again.", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
          });
    })
}

export function updateAdventure(adventureData, additionalServices){
    api
    .post("/adventure/update-adventure", adventureData)
    .then((responseData) => {
         updateAdditionalServices(adventureData.id, additionalServices);
    })
    .catch((err) => {toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                });
            });
}

function updateAdditionalServices(offerId, additionalServiceDTOS){
    console.log(additionalServiceDTOS);
    api
    .post("/adventure/update-adventure-services",  {
        params:{
            offerId : offerId,
            additionalServiceDTOS : additionalServiceDTOS
        }
    })
    .then((responseData) => {
                        toast.success(responseData.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    })
    .catch((errMessage) => {toast.error(errMessage.response.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    });
}

export function addAdventure(adventureData, additionalServices){
    let email = getUsernameFromToken();
    adventureData.append('email', email);
    console.log(adventureData.get("offerName"));
    api
    .post("/adventure/add-adventure", adventureData)
    .then((responseData) => {
        let adventureId = responseData.data;
        addAddtionalServices(adventureId, additionalServices);
    })
    .catch((err) => {toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                });
            });
}

export function searchAdventureByInstructor(params, setOffers){
    console.log("PARAMS", params);
    params.maxPeople = params.maxPeople == "" ? -1 : params.maxPeople; 
    params.price = params.price == "" ? -1 : params.price; 
    return api
        .get("/adventure/search-adventures",  {params} + "/"
                                            + getUsernameFromToken())
        .then((data) => {console.log(data.data); setOffers(data.data)}) 
        .catch((err) => {toast.error(err.response.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    });
    
}

export function checkReservation(adventureData) {
    console.log("tu", );
     return api
      .get("/adventure/allowed-operation", {
        params: {
            adventureId: adventureData.id,
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
  export function deleteAdventure(adventureId) {
      console.log("id", adventureId);
    return api
      .get("/adventure/delete", {
        params: {
            adventureId: adventureId,
        },
      })
      .then((response) => {
        toast.success(
          "You successfully deleted the cottage!",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
          }
        );
      })
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


