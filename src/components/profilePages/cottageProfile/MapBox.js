import { createTheme } from "@mui/material/styles";
import "./CottageProfilePage.scss";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#99A799",
    },
    secondary: {
      main: "#ADC2A9",
    },
  },
});

function MapBox({ street, city, state }) {
  let address = "".concat(
    state.split(" ").join(""),
    ",",
    city.split(" ").join(""),
    ",",
    street.split(" ").join("")
  );
  const iframeSource = "".concat(
    '<iframe src="https://maps.google.com/maps?q=',
    address,
    '&hl=es;z=14&amp;output=embed" class="map" ></iframe>'
  );
  return (
    <div className="addressContainer">
      <div className="specialOffersTitle">
        <HomeIcon color="action" className="icon" />
        <label className="tittleAddress">Address: </label>
        <hr className="tittleLine"></hr>
      </div>
      <div
        className="map"
        dangerouslySetInnerHTML={{ __html: iframeSource }}
      ></div>
    </div>
  );
}

export default MapBox;
