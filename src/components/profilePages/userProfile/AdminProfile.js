import "../../../style/AdminProfile.scss" 
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import profileIcon from '../../images/admin_icon.png'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import BasicInfoBox from "./BasicInfoBox";
import AddressInfoBox from "./AddressInfoBox";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeAdminData from "../../forms/user/ChangeAdminData";
import {getAdminByEmail} from "../../../services/AdminService";
import ChangePassword from "../../forms/user/ChangePassword";

function AdminProfile(){

    const [adminData, setAdminData]  = useState();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openPasswordManager, setPasswordManager] = useState(false);
    const handleOpenPass = () => setPasswordManager(true);
    const handleClosePass = () => setPasswordManager(false);

    const childToParent = (childData) => {
        setAdminData(prevState => ({
            ...prevState,
            ["firstName"]: childData.firstName,
            ["lastName"]: childData.lastName,
            ["phoneNumber"]: childData.phoneNumber,
            ["city"]: childData.city,
            ["street"]: childData.street,
            ["state"]: childData.state,

        }));
      }

    useEffect(() => {
        async function setData() {
            let requestData = await getAdminByEmail();
            setAdminData(!!requestData ? requestData.data : {});        //  requestData.data.email;

        return requestData;    
    }
       setData();
       
    }, [])

    if(!!adminData){
        return(
             
            <div className="adminProfileContainer">
                <Grid container component="main" sx={{ height: '100vh', width: '40vw', marginLeft:'10%'}}> 
                    <CssBaseline />
                    <Grid item xs={12} sm={5}>
                        <img src={profileIcon} width="60%"></img>
                    </Grid>
        
                    <BasicInfoBox basicData={adminData}></BasicInfoBox>
           
                    <Grid item xs={12} sm={1}>
                        <EmailIcon/>
                        <br/><br/>
                        <LockIcon/>
                        <br/><br/>
                        <SettingsIcon/>
                        <br/><br/>
                        <DeleteIcon/>
                    </Grid>
                          
                    <Grid item xs={12} sm={4}>
                        <Typography>
                                <label className="email">{adminData.email}</label>
                                <br/><br/>
                                <Button  size="small" sx={{backgroundColor:"#99A799", color:"black"}} onClick={handleOpenPass}> Change password</Button>
                                <br/><br/>
                                <Button  size="small" sx={{backgroundColor:"#99A799", color:"black"} } onClick={handleOpen}> Change private data</Button>
                                <br/><br/>
                                <Button  size="small" sx={{backgroundColor:"#99A799", color:"black"}} > Delete profile</Button>
                                
                        </Typography>         
                    </Grid> 

                     <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{backgroundColor:"rgb(218, 224, 210, 0.6)"}}
                    >
                        
                            <ChangeAdminData currentAdminData={adminData} close={handleClose} childToParent={childToParent} />
                    
                    </Modal>
                    <Modal
                        open={openPasswordManager}
                        onClose={handleClosePass}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)" }}
                    >
                        <ChangePassword close={handleClosePass}/>
                    </Modal>

                    <AddressInfoBox addressData={adminData}/>
                    
                    <Grid xs={12} sm={5}/>

        
                </Grid>
            </div>
            
        );
    }
   

}

export default AdminProfile;