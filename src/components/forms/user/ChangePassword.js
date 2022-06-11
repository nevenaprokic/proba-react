import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl } from '@mui/material';
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import { getUsernameFromToken } from '../../../app/jwtTokenUtils';
import api from '../../../app/api';
import { toast } from "react-toastify";
import "../../../style/ChangeOwnerData.scss";
import { firstLoginChangePassword } from '../../../services/AdminService';


export default function ChangePassword({close, setUpdatePassword}) {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#5f6d5f",
      },
      secondary: {
        main: "#CC7351",
      },
    },
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm({});

  const password = useRef({});
  password.current = watch("newPassword1", "");

 
  const onSubmit = (data) => {
    console.log(getUsernameFromToken());
    if(!!setUpdatePassword){
      firstLoginChangePassword(data, close)
    }
    else{
      api
      .post("/user/update-password/" + getUsernameFromToken(), data)
      .then(res => {
        close();
        toast.success(res.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        });
      });
    }
  }

  return (
    <div className="changeDataContainer" id="changeDataContainer">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'inline',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft:-5,
              width: "120%"
              
            }}
          >
              <div><br/></div>
              <div className="header">
                  <div className='tittle'>
                      <Typography component="h1" variant="h5" sx={{color:"#CC7351"}}>
                        Change password
                      </Typography>
                  </div>
                  <div className="closeBtn" >
                    <Button size="large" sx={{}} onClick={ () => close() } >x</Button>
                  </div>
                 
                </div>
             
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
              <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '35ch' }}>
                  <Input 
                  name="oldPassword"
                  id="oldPassword"
                  type="password"
                   {...register("oldPassword")}
                   />
                <FormHelperText id="standard-weight-helper-text">Old password</FormHelperText>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '35ch' }}>
                  <Input 
                  name="newPassword1"
                  id="newPassword1"
                  type="password"
                   {...register("newPassword1")}/>
                <FormHelperText id="standard-weight-helper-text">New password</FormHelperText>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '35ch' }}>
                  <Input 
                  name="newPassword2"
                  id="newPassword2"
                  type="password"
                  required
                   {...register("newPassword2", {
                    validate: value =>
                      value === password.current || "Passwords don't match"
                  })}/>
                <FormHelperText id="standard-weight-helper-text">Confirm new password</FormHelperText>
                {errors.newPassword2 && (
                    <p style={{ color: "#ED6663" }}>
                      {errors.newPassword2.message}
                    </p>
                  )}
              </FormControl>
              
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirm changes
              </Button>
              
              <div><br/></div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}