import api from "../app/api";
import { addAddtionalServices } from "./AdditionalServicesService";
import { getUsernameFromToken } from "../app/jwtTokenUtils";
import { toast } from "react-toastify";

export function getAdventureByInstructorEmail(username) {
  return api
    .get("/adventure/instructor-adventures/" + username)
    .then((response) => response)
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function getAdventureById(id) {
  return api
    .get("/adventure/details", {
      params: {
        id: id,
      },
    })
    .then((data) => data)
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function checkUpdateAllowed(adventureData) {
  console.log(adventureData);
  return api
    .get(
      "/adventure/update-allowed/" +
        adventureData.ownerEmail +
        "/" +
        adventureData.id
    )
    .then((response) => response.data)
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

export function updateAdventure(adventureData, additionalServices) {
  api
    .put("/adventure/update-adventure", adventureData)
    .then((responseData) => {
      updateAdditionalServices(adventureData.id, additionalServices);
    })
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

function updateAdditionalServices(offerId, additionalServiceDTOS) {
  console.log(additionalServiceDTOS);
  api
    .post("/adventure/update-adventure-services", {
      params: {
        offerId: offerId,
        additionalServiceDTOS: additionalServiceDTOS,
      },
    })
    .then((responseData) => {
      toast.success(responseData.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    })
    .catch((errMessage) => {
      toast.error(errMessage.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function addAdventure(adventureData, additionalServices) {
  let email = getUsernameFromToken();
  adventureData.append("email", email);
  console.log(adventureData.get("offerName"));
  api
    .post("/adventure/add-adventure", adventureData)
    .then((responseData) => {
      let adventureId = responseData.data;
      addAddtionalServices(adventureId, additionalServices);
    })
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function searchAdventureByInstructor(params, setOffers) {
  params.maxPeople = params.maxPeople == "" ? -1 : params.maxPeople;
  params.price = params.price == "" ? -1 : params.price;
  params.email = getUsernameFromToken();
  console.log(params);
  return api
    .get("/adventure/search-adventures", { params })
    .then((data) => {
      console.log(data.data);
      setOffers(data.data);
    })
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function checkReservation(adventureData) {
  console.log("tu");
  return api
    .get("/adventure/allowed-operation", {
      params: {
        adventureId: adventureData.id,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
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
export function deleteAdventure(adventureId, setOffers, allOffers) {
  console.log("id", adventureId);
  return api
    .delete("/adventure/delete/" +  adventureId)
    .then((response) => {
      toast.success("You successfully deleted the cottage!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
      setOffers(allOffers.filter((offer)=> offer.id !== adventureId));
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

export function getAllAdventures(page, pageSize) {
  return api
    .get("/adventure/all-by-pages/", {
      params: {
        page: page,
        pageSize: pageSize,
      },
    })
    .then((response) => response)
    .catch((err) => {
      if (err.response.status === 401) {
        return <div>Greska u autentifikaciji</div>;
      } else if (err.response.status === 403) {
        return <div>Greska u autorizaciji</div>;
      } else if (err.response.status === 404) {
        return <div>Trenutno nema nepregledanih recenzija</div>;
      } else {
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        });
      }
    });
}

export function deleteAdventureByAdmin(
  adventureId,
  setAdventuers,
  allAdventures
) {
  api
    .get("/adventure/allowed-operation", {
      params: {
        adventureId: adventureId,
      },
    })
    .then((response) => {
      if (response.data) {
        deleteAdventure(adventureId, setAdventuers, allAdventures);
       
      } else {
        toast.error(
          "Delete is not allowed besause offer has future reservations",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
          }
        );
      }
    })
    .catch((err) => {
      console.log("tuu");
      toast.error("Something went wrong, please try again later.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}
