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

export function getAllCottageOwners(page, pageSize) {
  return api
    .get("admin/all-cottage-owners", {
      params: {
        page: page,
        pageSize: pageSize
      }
    })
    .then((response) => response)
    .catch((err) => {
      if (err.response.status === 401) {
        return (<div>Greska u autentifikaciji</div>)
      }
      else if (err.response.status === 403) {
        return (<div>Greska u autorizaciji</div>)
      }
      else if (err.response.status === 404) {
        return (<div>Trenutno nema nepregledanih recenzija</div>)
      }
      else {
        toast.error("Something went wrong, please try again later.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        })

      }
    }

    )
}

export function deleteCottageOwner(userId, allUsers, setUsers) {
  return api
    .delete("/cottage-owner/delete-cottage-owner/" + userId)
    .then((response) => {
              toast.success(response.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1500,
                          })
                setUsers(allUsers.filter((user) => user.id !== userId));
            })
    .catch((err) => {
      if (err.response.status === 401) {
        return (<div>Greska u autentifikaciji</div>)
      }
      else if (err.response.status === 403) {
        return (<div>Greska u autorizaciji</div>)
      }
      else if (err.response.status === 404) {
        return (<div>Trenutno nema nepregledanih recenzija</div>)
      }
      else {
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        })

      }
    }

    )
}

