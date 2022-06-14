import "./CottageProfilePage.scss";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoom from "@mui/icons-material/MeetingRoom";
import ArticleIcon from "@mui/icons-material/Article";
import { createTheme } from "@mui/material/styles";
import ShowMoreText from "react-show-more-text";
import { getAddressByCottageId } from "../../../services/AddressService";
import * as React from "react";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";

function executeOnClick(isExpanded) {}

function BasicAdventureInfiBox({ basicInfo }) {
  const [addressData, setAddressData] = useState();

  useEffect(() => {
    async function setData() {
      let address = await getAddressByCottageId(basicInfo.id);
      setAddressData(!!address ? address.data : {});

      return address;
    }
    setData();
  }, []);
  if (!!addressData) {
    return (
      <div className="basicInfoContainer">
        <div>
          {/* <div className="basicBoxItem">
            <HomeIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">Address: </label>
          <label className="basicBoxItemText">
            {addressData.street}, {addressData.city}, {addressData.state}
          </label> */}
        </div>
        <div>
          <div className="basicBoxItem">
            <PersonIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">
            Maximum number of people:{" "}
          </label>
          <label className="basicBoxItemText">{basicInfo.numberOfPerson}</label>
        </div>
        <div>
          <div className="basicBoxItem">
            <MeetingRoom color="action" />
          </div>
          <label className="basicBoxItemTitle">Rooms number: </label>
          <label className="basicBoxItemText">{basicInfo.roomNumber}</label>
        </div>
        <div>
          <div className="basicBoxItem">
            <HotelIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">Beds number: </label>
          <label className="basicBoxItemText">{basicInfo.bedNumber}</label>
        </div>
        <div>
          <div className="basicBoxItem">
            <ArticleIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">Description: </label>

          <div className="descriptionText">
            <ShowMoreText
              lines={7}
              more="Show more"
              less="Show less"
              className="content-css"
              anchorClass="my-anchor-css-class"
              onClick={executeOnClick}
              expanded={false}
              width={280}
              truncatedEndingComponent={"... "}
            >
              {basicInfo.description}
            </ShowMoreText>
          </div>
        </div>
      </div>
    );
  } else return null;
}

export default BasicAdventureInfiBox;
