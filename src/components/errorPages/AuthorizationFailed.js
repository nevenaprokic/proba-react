import { Typography } from "@mui/material";
import "./ErrorPages.scss";

function AuthorizationFailed() {
  return (
    <div className="errorContainer">
      <div className="errorMessageContainer">
        <Typography
          variant="h4"
          sx={{ color: "#CC7351", fontWeight: "semiBold" }}
        >
          Authorization failed
        </Typography>
        <br />
        <br />
        <Typography variant="h6">
          You are not allowed to do this function.
        </Typography>
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

export default AuthorizationFailed;
