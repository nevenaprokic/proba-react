import "../cottageProfile/CottageProfilePage.scss";
import { getAddressByShipId } from "../../../services/AddressService";
import * as React from "react";
import { useState, useEffect } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import SailingIcon from "@mui/icons-material/Sailing";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import SpeedIcon from "@mui/icons-material/Speed";
import BoltIcon from "@mui/icons-material/Bolt";
import PhishingIcon from "@mui/icons-material/Phishing";
import PersonIcon from "@mui/icons-material/Person";

function BasicShipInfoBox({ basicInfo }) {
  const [addressData, setAddressData] = useState();

  useEffect(() => {
    async function setData() {
      let address = await getAddressByShipId(basicInfo.id);
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
          <label className="basicBoxItemTitle">Number of passengers: </label>
          <label className="basicBoxItemText">{basicInfo.numberOfPerson}</label>
        </div>
        <div>
          <div className="basicBoxItem">
            <NavigationIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">Navigation equptment: </label>
          <label className="basicBoxItemText">
            {basicInfo.navigationEquipment}
          </label>
        </div>
        <div>
          <div className="basicBoxItem">
            <SailingIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">Ship type: </label>
          <label className="basicBoxItemText">{basicInfo.type}</label>
          <label className="basicBoxItemTitle">Size: </label>
          <label className="basicBoxItemText">{basicInfo.size}</label>
        </div>
        <div>
          <div className="basicBoxItem">
            <TwoWheelerIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">Motor number: </label>
          <label className="basicBoxItemText">{basicInfo.motorNumber}</label>
        </div>
        <div>
          <div className="basicBoxItem">
            <BoltIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">Motor power: </label>
          <label className="basicBoxItemText">{basicInfo.motorPower}</label>
        </div>
        <div>
          <div className="basicBoxItem">
            <SpeedIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">Max speed: </label>
          <label className="basicBoxItemText">{basicInfo.maxSpeed}</label>
        </div>
        <div>
          <div className="basicBoxItem">
            <PhishingIcon color="action" />
          </div>
          <label className="basicBoxItemTitle">Additional equipment: </label>
          <label className="basicBoxItemText">
            {basicInfo.additionalEquipment}
          </label>
        </div>
      </div>
    );
  } else return null;
}

export default BasicShipInfoBox;
