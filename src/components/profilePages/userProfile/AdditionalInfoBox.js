import "./OwnerProfile.scss" 
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { getRoleFromToken } from '../../../app/jwtTokenUtils';
import Biography from "./Biography";
import CategoryInfoTabel from "./CategoryInfoTabel";
import { userType } from "../../../app/Enum";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";


function AdditionalInfoBox({additionalDate}){
    const [open, setOpen] = useState(false);
    function handleOpen() {setOpen(true);}
    function handleClose() {setOpen(false);}

    return(
        <Grid item xs={12} sm={7} component={Paper} elevation={10} square height={"30%"} sx={{borderRadius: "5%", minHeight: "200px"}}>
        <Box className="infoBoxContainer">
        <div className="infoBox">
            <label className="boxTitle">Additional information</label><br/><br/>
        
            <div>
                <div className="boxItem">
                <IconButton aria-label="change" sx={{color:"#CC7351", marginTop: 0, marginLeft: 0, width: "25px", height: "12px"}} onClick={handleOpen}>
                    <AssessmentIcon />
                  </IconButton>
                </div>
                <label className="boxItemTitle">User category: </label>
                <label className="boxItemText">{additionalDate.userCategory}</label>
            </div>
            <div>
              <div className="boxItem">
                  <AssessmentIcon color="action"/>
              </div>
              <label className="boxItemTitle">Points from reservation: </label>
              <label className="boxItemText" >{additionalDate.points}</label>
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backgroundColor:"rgb(218, 224, 210, 0.6)", overflow:"auto"}}
            >
                        <CategoryInfoTabel categoryType={userType.OWNER}/>
                    
            </Modal>

            {getRoleFromToken() != userType.COTTAGE_OWNER && getRoleFromToken() != userType.SHIP_OWNER && 
                
                <Biography bigraphy={additionalDate.biography} />
                   
            }
        
          </div>
        </Box>
      </Grid>
    );
}

export default AdditionalInfoBox;