import api from "../app/api";
import { getUsernameFromToken } from "../app/jwtTokenUtils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export function changeCottageOwnerData(newCottageOwnerData) {
  let email = getUsernameFromToken();
  newCottageOwnerData["email"] = email;
  api
    .put("/cottage-owner/change-data", newCottageOwnerData)
    .then((responseData) => {
      toast.success("You successfully changed the data.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    })
    .catch((err) => alert(err.data));
}
export function getCottageOwnerByUsername(username) {
  return api
    .get("/cottage-owner/profile-info", {
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

export function sendDeleteRequestCottageOwner(data){
  return api
      .post("/cottage-owner/send-delete-request?email=" + getUsernameFromToken(), data)
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
