import '../../../style/ConciseClientProfile.scss';
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import profileIcon from '../../images/profile.png'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import BasicInfoBox from "../../profilePages/userProfile/BasicInfoBox";
import AddressInfoBox from "../../profilePages/userProfile/AddressInfoBox";
import AdditionalInfoClientBox from "../../profilePages/userProfile/AdditionalInfoClientBox";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../../app/api';


function ConciseClientProfile({closeModal, clientEmail}){

    const [clientData, setClientData] = React.useState();

    React.useEffect(() => {
        async function setData() {
            const request = await api.get(
              "client/profile-info/" + clientEmail
            ).catch(() => { console.log("Doslo je do neke greske kod dobavljanja podataka o klijentu."); });
            setClientData(request ? request.data : null);
          }
          setData();
    }, [])

    return (
        !!clientData &&
        <div className="clientProfileContainer">
            <Grid container component="main" sx={{ height: '100vh', width: '40vw', marginLeft:'10%'  }}>
                <CssBaseline />
                <Grid item xs={12} sm={5} lg={5}>
                    <img src={profileIcon} width="60%"></img>
                </Grid>

                <BasicInfoBox basicData={clientData}></BasicInfoBox>
       
                <Grid item xs={12} sm={1} lg={1}>
                    <EmailIcon/>
                    <br/><br/>
                </Grid>
                      
                <Grid item xs={12} sm={4} lg={4}>
                    <Typography>
                        <label className="email">{clientData.email}</label>
                    </Typography>      
                </Grid>

                <AddressInfoBox addressData={clientData}/>
                
                <Grid xs={12} sm={5} lg={5}/>
                <AdditionalInfoClientBox additionalData={clientData}/>
                

            </Grid>
        </div>
    )
}

export default ConciseClientProfile;