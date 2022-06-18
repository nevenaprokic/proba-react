import { Typography } from "@mui/material";
import "./ErrorPages.scss";

function AuthentificationFailed() {
  return (
    <div className="errorContainer">
      <div className="errorMessageContainer">
        <Typography
          variant="h4"
          sx={{ color: "#CC7351", fontWeight: "semiBold" }}
        >
          Authentification failed
        </Typography>
        <br />
        <br />
        <Typography variant="h6">You are not logged in.</Typography>
        <Typography variant="h6">
          Please go to{" "}
          <a target="_self" href="http://localhost:3000/log-in">
            login page
          </a>
        </Typography>
      </div>
    </div>
  );
}

export default AuthentificationFailed;
