import api from "../app/api";
import { getRoleFromToken, getUsernameFromToken } from "../app/jwtTokenUtils";
import { toast } from "react-toastify";

export function changeAdminData(newAdminData){
    let email = getUsernameFromToken();
    newAdminData["email"] = email;
    api
    .post("/admin/change-data", newAdminData)
    .then((responseData) => {toast.success(responseData.data, {
                                position: toast.POSITION.BOTTOM_RIGHT,
                                autoClose: 1500,
                            });
})
    .catch((err) => toast.error(err.response.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    }));
}

export function getAdminByEmail(){
    let email = getUsernameFromToken();
    console.log(getRoleFromToken());
    return api
    .get("/admin/profile-info/" + email)
    .then((responseData) => responseData)
    .catch((err) => toast.error("Admin not found." ,{
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                }));

}

export function addNewAdmin(adminData){
    api
    .post("/admin/add-admin", adminData)
    .then((response) => toast.success(response.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    }))
    .catch((err) => toast.error(err.response.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    }))
}

export function firstLoginChangePassword(adminData, close){
  console.log(adminData);
    api
    .post("/admin/change-password/" + getUsernameFromToken(), adminData)
    .then(res =>{
        let data = {
          email: getUsernameFromToken(),
          password: adminData["newPassword1"]
        }
        login(data);
      close();
      toast.success(res.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    })
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

function login(data){
    api
      .post("auth/login", data)
      .then((res) => {
        const token = res.data.accessToken;
        localStorage.setItem("user", token);
        window.location = "/user-home-page/admin"
      })
      .catch((err) => {
        toast.error("Username or password is not correct.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        });
      });
  }

  export function getAllComplaints(){
    return api
    .get("/admin/all-complaints")
    .then((response) => response)
    .catch((err) => console.log(err));
  }

  export function sentResponseOnComplaint(response, complaintID, setComplaints, complaints){
    api
    .put("admin/complaint-response/" + response + "/"+ complaintID)
    .then((response)=> { toast.success(response.data, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1500,
                        })
              setComplaints(complaints.filter((complaint) => complaint.id !== complaintID));

              })
    .catch((err) => toast.error(err.response.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        }))

  }

  export function getAllDeleteAccountRequests(){
    return api
    .get("/admin/delete-account-requets")
    .then((response) => response)
    .catch((err) => {
        if (err.response.status === 401){
          return(<div>Greska u autentifikaciji</div>)
        }
        else if (err.response.status === 403){
          return(<div>Greska u autorizaciji</div>)
        }
        else if (err.response.status === 404){
          return(<div>Trenutno nema nepregledanih recenzija</div>)
        }
        else{
          toast.error(err.response.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
        })
    }
    }
    
      
  )
  }

  export function deleteAccountOnRequest(response, request, setDeleteRequests, allDeleteRequests){
    api
    .put("/admin/delete-request/delete/" + request.userId + "/" + request.requestId, response)
    .then((response) => {toast.success(response.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                                  })
                        setDeleteRequests(allDeleteRequests.filter((deleteRequest) => deleteRequest.requestId !== request.requestId));

          })
    .catch((err) => {
      if (err.response.status === 401){
        return(<div>Greska u autentifikaciji</div>)
      }
      else if (err.response.status === 403){
        return(<div>Greska u autorizaciji</div>)
      }
      else if (err.response.status === 404){
        return(<div>Trenutno nema nepregledanih recenzija</div>)
      }
      else{
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
      })

    }
  })
}

export function rejectDeleteAccountOnRequest(response, request, setDeleteRequests, allDeleteRequests){
  api
  .put("/admin/delete-request/reject/" + request.userId + "/" + request.requestId, response)
  .then((response) => {toast.success(response.data, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 1500,
                                })
                      setDeleteRequests(allDeleteRequests.filter((deleteRequest) => deleteRequest.requestId !== request.requestId));

        })
  .catch((err) => {
    if (err.response.status === 401){
      return(<div>Greska u autentifikaciji</div>)
    }
    else if (err.response.status === 403){
      return(<div>Greska u autorizaciji</div>)
    }
    else if (err.response.status === 404){
      return(<div>Trenutno nema nepregledanih recenzija</div>)
    }
    else{
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
    })

  }
})
}
  
