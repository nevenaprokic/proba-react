import api from "../app/api";
import { toast } from "react-toastify";

export function getMarkByCottageOwnerEmail(email){
    return api
        .get("/mark/get-all-cottage", {
            params:{
                email:email
            }
        })
        .then((data) => data)
        .catch((err) => {
            console.log("Nije uspesno dobavljeno");
            return err.message;
        });
}
export function getMarkByInstructorEmail(email){
    return api
        .get("/mark/get-all-adventure", {
            params:{
                email:email
            }
        })
        .then((data) => data)
        .catch((err) => {
            console.log("Nije uspesno dobavljeno");
            return err.message;
        });
}
export function getMarkByShipOwnerEmail(email){
    return api
        .get("/mark/get-all-ship", {
            params:{
                email:email
            }
        })
        .then((data) => data)
        .catch((err) => {
            console.log("Nije uspesno dobavljeno");
            return err.message;
        });
}

export function getAllNotApprovedMarks(){
    return api
    .get("/mark/all-unchecked")
    .then((responseData) => responseData)
    .catch((err) => {
        if (err.response.status === 404){
            return(<div>Trenutno nema nepregledanih recenzija</div>)
        }
        else{
            toast.error(err.response.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1500,
            });
        }
        
    } )
}

export function acceptMark(mark, setMarks, allUncheckedMarks){
    api
    .put("/mark/accept/" + mark.id)
    .then((responseData) => {toast.success(responseData.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                        setMarks(allUncheckedMarks.filter((uncheckedMark) => uncheckedMark.id !== mark.id))
                     })
    .catch((err) => {toast.err(err.response.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                })
}

export function rejectMark(mark, setMarks, allUncheckedMarks){
    api
    .put("/mark/discard/" + mark.id)
    .then((responseData) => {toast.success(responseData.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                        setMarks(allUncheckedMarks.filter((uncheckedMark) => uncheckedMark.id !== mark.id))
                     })
    .catch((err) => {toast.err(err.response.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                })
}