import api from "../app/api";
import { toast } from "react-toastify";

export function getAllOwnerCategories(){
    return api
    .get("/loyalty/owner-categories")
    .then((responseData) => responseData)
    .catch((err)  => {toast.err("Something went wrong!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                })
}

export function getAllClientCategories(){
    return api
    .get("/loyalty/client-categories")
    .then((responseData) => responseData)
    .catch((err)  => {toast.error("Something went wrong!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                })
}


export function updateClientCategory(updateData,setLoyaltyCategories){
    api
    .post("/loyalty/update-client-category", updateData)
    .then((responseData) => {
                            updateLoyaltyClientCategories(setLoyaltyCategories);
        
                            toast.success(responseData.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    })
    .catch((err) => {
                    toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                });
            })
}

export function updateOwnerCategory(updateData, setLoyaltyCategories ){
    api
    .post("/loyalty/update-owner-category", updateData)
    .then((responseData) => {
                            updateLoyaltyOwnerCategories(setLoyaltyCategories);
                            
                            toast.success(responseData.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    })
    .catch((err) => {
                    toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                });
            })
}


function updateLoyaltyOwnerCategories(setLoyaltyCategories){
    api
    .get("/loyalty/owner-categories")
    .then((responseData) => {
        console.log(responseData.data);
        console.log(setLoyaltyCategories);
        setLoyaltyCategories(responseData.data ? responseData.data : {})
    })
    .catch((err)  => {toast.error("Something went wrong!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                })
}

function updateLoyaltyClientCategories(setLoyaltyCategories){
    api
    .get("/loyalty/client-categories")
    .then((responseData) => setLoyaltyCategories(responseData.data ? responseData.data : {}))
    .catch((err)  => {toast.error("Something went wrong!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                })
}

export function addClientCategory(categoryData, setLoyaltyCategories){
    api
    .post("/loyalty/add-client-category", categoryData)
    .then((responseData) => {
                            updateLoyaltyClientCategories(setLoyaltyCategories);
        
                            toast.success(responseData.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    })
    .catch((err) => {
                    toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                });
            })
}

export function addOwnerCategory(categoryData, setLoyaltyCategories ){
    api
    .post("/loyalty/add-owner-category", categoryData)
    .then((responseData) => {
                            updateLoyaltyOwnerCategories(setLoyaltyCategories);
                            
                            toast.success(responseData.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    })
    .catch((err) => {
                    toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1500,
                });
            })
}

export function deleteClientCategory(id, setLoyaltyCategories){
    api
    .post("/loyalty/delete-client-category", id
    )
    .then((responseMess) => {
                            updateLoyaltyClientCategories(setLoyaltyCategories);
                            toast.success(responseMess.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    })
        .catch((err) => {toast.error(err.response.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                })
}

export function deleteOwnerCategory(id, setLoyaltyCategories){
    api
    .post("/loyalty/delete-owner-category", id
    )
    .then((responseMess) => {
                            updateLoyaltyOwnerCategories(setLoyaltyCategories);
                            toast.success(responseMess.data, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1500,
                        });
                    })
        .catch((err) => {toast.error(err.response.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1500,
                    });
                })
}

export function getClientCategoryInfo(categoryName){
    api
    .get("/loyalty/client-category-info", {
        params: {
            categoryName: categoryName
        }
    })
    .then((responseData) => responseData)
    .catch((err) =>  {toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
    });
})
}

export function getOwnerCategoryInfo(categoryName){
    api
    .get("/loyalty/owner-category-info", {
        params: {
            categoryName: categoryName
        }
    })
    .then((responseData) => responseData)
    .catch((err) =>  {toast.error(err.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
    });
})
}