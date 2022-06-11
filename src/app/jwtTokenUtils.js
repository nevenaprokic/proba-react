import jwtDecode from "jwt-decode";


export function getUsernameFromToken(){
    try{
        let token = jwtDecode(localStorage.getItem("user"));
        let username = token.sub;
        return username;
    }
    catch{
        console.log("There is no token.");
        return null;
    }
}
export function getRoleFromToken(){
    try{
        let token = jwtDecode(localStorage.getItem("user"));
        let role = token.role.name;
        return role;
    }
    catch{
        console.log("Greska");
        return null;
    }
}