import api from "../app/api";

export function getAddressByCottageId(id){
    return api
        .get("/address/get-info", {
            params:{
                id:id
            }
        })
        .then((data) => data)
        .catch((err) => {
            console.log("Nije uspesno dobavljeno");
            return err.message;
        });
}

export function getAddressByShipId(id){
    return api
        .get("/address/get-info", {
            params:{
                id:id
            }
        })
        .then((data) => data)
        .catch((err) => {
            console.log("Nije uspesno dobavljeno");
            return err.message;
        });
}