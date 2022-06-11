import api from "../app/api";
import { toast } from "react-toastify";

export function getQuickActionByOfferId(id) {
  return api
    .get("quick-reservation/get", {
      params: {
        id: id,
      },
    })
    .then((data) => data)
    .catch((err) => {
      console.log("Nije uspesno dobavljeno");
      return err.message;
    });
}
export function alreadyExistQuickReservationForOffer(data) {
  return api
    .get("quick-reservation/already-exist", {
      params: {
        offerId: data.offerId,
        startDate: data.startDateAction,
        dateNumber: data.daysAction,
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
export function isAvailablePeriod(data) {
  return api
    .get("quick-reservation/available-period", {
      params: {
        offerId: data.offerId,
        startDate: data.startDateReservation,
        dateNumber: data.daysReservation,
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
export function makeQuickReservation(data, additionalServicesInputList) {
  api
    .post("/quick-reservation/add", data)
    .then((responseData) => {
        let quickId = responseData.data;
      addAddtionalServices(quickId, additionalServicesInputList);
      toast.success("You successfully added a new quick resrevation.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    })
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    });
}
function addAddtionalServices(quickId, additionalServiceDTO) {
    console.log(additionalServiceDTO);
    api
      .post("/quick-reservation/add-additional-services", {
        params: {
            quickId: quickId,
          additionalServiceDTO: additionalServiceDTO,
        },
      })
      .then((responseData) => console.log("Uspesno"))
      .catch((errMessage) => alert(errMessage.data));
  }
