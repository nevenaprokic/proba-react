import api from "../app/api";
import { getRoleFromToken, getUsernameFromToken } from "../app/jwtTokenUtils";
import { toast } from "react-toastify";

export function changeAdminData(newAdminData) {
  let email = getUsernameFromToken();
  newAdminData["email"] = email;
  api
    .put("/admin/change-data", newAdminData)
    .then((responseData) => {
      toast.success(responseData.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    })
    .catch((err) =>
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      })
    );
}

export function getAdminByEmail() {
  let email = getUsernameFromToken();
  console.log(getRoleFromToken());
  return api
    .get("/admin/profile-info/" + email)
    .then((responseData) => responseData)
    .catch((err) =>
      toast.error("Admin not found.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      })
    );
}

export function addNewAdmin(adminData) {
  api
    .post("/admin/add-admin", adminData)
    .then((response) =>
      toast.success(response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      })
    )
    .catch((err) =>
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      })
    );
}

export function firstLoginChangePassword(adminData, close) {
  console.log(adminData);
  api
    .put("/admin/change-password/" + getUsernameFromToken(), adminData)
    .then((res) => {
      let data = {
        email: getUsernameFromToken(),
        password: adminData["newPassword1"],
      };
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

function login(data) {
  api
    .post("auth/login", data)
    .then((res) => {
      const token = res.data.accessToken;
      localStorage.setItem("user", token);
      window.location = "/user-home-page/admin";
    })
    .catch((err) => {
      toast.error("Username or password is not correct.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function getAllComplaints() {
  return api
    .get("/admin/all-complaints")
    .then((response) => response)
    .catch((err) => console.log(err));
}

export function sentResponseOnComplaint(
  response,
  complaintID,
  setComplaints,
  complaints
) {
  api
    .put("admin/complaint-response/" + response + "/" + complaintID)
    .then((response) => {
      toast.success(response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
      setComplaints(
        complaints.filter((complaint) => complaint.id !== complaintID)
      );
    })
    .catch((err) =>
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      })
    );
}

export function getAllDeleteAccountRequests() {
  return api
    .get("/admin/delete-account-requets")
    .then((response) => response)
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function deleteAccountOnRequest(
  response,
  request,
  setDeleteRequests,
  allDeleteRequests
) {
  api
    .put(
      "/admin/delete-request/delete/" +
        request.userId +
        "/" +
        request.requestId,
      response
    )
    .then((response) => {
      toast.success(response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
      setDeleteRequests(
        allDeleteRequests.filter(
          (deleteRequest) => deleteRequest.requestId !== request.requestId
        )
      );
    })
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function rejectDeleteAccountOnRequest(
  response,
  request,
  setDeleteRequests,
  allDeleteRequests
) {
  api
    .put(
      "/admin/delete-request/reject/" +
        request.userId +
        "/" +
        request.requestId,
      response
    )
    .then((response) => {
      toast.success(response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
      setDeleteRequests(
        allDeleteRequests.filter(
          (deleteRequest) => deleteRequest.requestId !== request.requestId
        )
      );
    })
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function getBusinessReportData(startDate, endDate) {
  return api
    .get("/admin/business-report", {
      params: {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      },
    })
    .then((response) => response)
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function getAllAdmin(page, pageSize) {
  return api
    .get(
      "/admin/all-admins/" +
        getUsernameFromToken() +
        "/" +
        page +
        "/" +
        pageSize
    )
    .then((response) => response)
    .catch((err) => {
      toast.error("Something went wrong, please try again later.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}

export function deleteAdmin(userId, allUsers, setUsers) {
  return api
    .delete("/admin/delete-admin/" + userId)
    .then((response) => {
      toast.success(response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
      setUsers(allUsers.filter((user) => user.id !== userId));
    })
    .catch((err) => {
      toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
}
