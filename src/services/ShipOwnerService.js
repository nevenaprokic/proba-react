import api from "../app/api";
import { getUsernameFromToken } from "../app/jwtTokenUtils";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export function changeShipOwnerData(newShipOwnerData) {
  let email = getUsernameFromToken();
  newShipOwnerData["email"] = email;
  api
    .put("/ship-owner/change-data", newShipOwnerData)
    .then((responseData) => {
      toast.success("You successfully changed the data.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    })
    .catch((err) => alert(err.data));
}

export function getShipOwnerByUsername(username) {
  return api
    .get("/ship-owner/profile-info", {
      params: {
        email: username,
      },
    })
    .then((responseData) => responseData)
    .catch((err) => {
      console.log("Nije uspesna prijava");
      return err.message;
    });
}

export function sendDeleteRequestShipOwner(data){
  return api
      .post("/ship-owner/send-delete-request?email=" + getUsernameFromToken(), data)
      .then((data) => {
        toast.success("You have successfully submitted a request to delete the order.", {
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
