import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import React from "react";
import logo from "../../logo2.png";
import { getRoleFromToken } from "../../app/jwtTokenUtils";
import LogoutIcon from "@mui/icons-material/Logout";


function MainNavigationHome() {
  return (
    <header className={classes.header}>
      <div>
        <img src={logo} />
      </div>
      <div className={classes.logo}></div>
      <div className="headerLine"></div>
      {!!getRoleFromToken() ? (
        <Link to="/">
          <LogoutIcon style={{ verticalAlign: "-4" }} /> Log out
        </Link>
      ) : (
        <></>
      )}
    </header>
  );
}

export default MainNavigationHome;
