import api from "../app/api";
import { toast } from "react-toastify";

export function getAllRegistrationRegusestr(){
    return api
    .get("/registration-request/get-all")
    .then((responseData) => responseData)
    .catch((err) => {toast.error(err.response.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    })}
        )

}

export function acceptRegistrationRequest(requestId, setRequests){
    api
    .post("/registration-request/accept", requestId)
    .then((responseData) => { 

        toast.success("Successfully accepted request", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
        });
                    setRequests(responseData.data ? responseData.data : {});
                    
    })
    .catch((err)=> {toast.error("Something went wrong", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                })})
}

export function discarRegistrationRequest(requestId, message, setRequests){
    api //email=" + getUsernameFromToken()
    .post("/registration-request/discard?requestId="+ requestId, message)
    .then((responseData) => {
                    setRequests(responseData.data ? responseData.data : {});
                    toast.success(responseData.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    })})
    .catch((err)=> {toast.error("Something went wrong", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                })})
}