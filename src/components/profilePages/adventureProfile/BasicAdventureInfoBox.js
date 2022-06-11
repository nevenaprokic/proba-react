import { Grid, Box, Button} from "@mui/material";
import "./AdventureProfilePage.scss" ;
import HomeIcon from '@mui/icons-material/Home';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoom from "@mui/icons-material/MeetingRoom";
import ArticleIcon from '@mui/icons-material/Article';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import ReadMoreReact from 'read-more-react';
import ShowMoreText from "react-show-more-text";

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

  
  
  function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }

function BasicAdventureInfiBox({basicInfo}){
    return (
        
            <div className="basicInfoContainer">
                 <div>
        
                    {/* <div className="basicBoxItem">
                        <HomeIcon color="action"/>
                    </div>
                    <label className="basicBoxItemTitle">Address: </label>
                    <label className="basicBoxItemText">{basicInfo.street}, {basicInfo.city}, {basicInfo.state}</label> */}
                </div>
                <div>
        
                    <div className="basicBoxItem">
                        <ArticleIcon color="action"/>
                    </div>
                    <label className="basicBoxItemTitle">Additional Equipment: </label>

                    <div className="descriptionText">
                        <ShowMoreText
                        
                            lines={3}
                            more="Show more"
                            less="Show less"
                            className="content-css"
                            anchorClass="my-anchor-css-class"
                            onClick={executeOnClick}
                            expanded={false}
                            width={280}
                            truncatedEndingComponent={"... "}
                        >
                            {basicInfo.additionalEquipment}
                        </ShowMoreText>
                    </div>
                </div>

                <div>
        
                    <div className="basicBoxItem">
                        <ArticleIcon color="action"/>
                    </div>
                    <label className="basicBoxItemTitle">Description: </label>
                    <div className="descriptionText">
                        <ShowMoreText
                        
                            lines={4}
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

}

export default BasicAdventureInfiBox;