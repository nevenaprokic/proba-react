import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
import "../../../style/ChangeOwnerData.scss";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import { userType } from "../../../app/Enum";
import "../../loyalty/LoyaltyProgram.scss";
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import categoryIcon from '../../images/laurel.png';
import { BlockPicker } from 'react-color';
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { updateClientCategory, updateOwnerCategory, addClientCategory, addOwnerCategory } from "../../../services/LoyaltyService";

function AddLoyaltyCategory({close, setLoyaltyCategories}){
    const [color, setColor] = useState("#000000");
    const [categoryType, setCategorType] = useState(userType.CLIENT);

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
    
      const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
      } = useForm({});

      function handleCategoryChange(event){
        setCategorType(event.target.value);
      }

    const onSubmit = (data) => {

        data.categoryColor = color;
        if(categoryType == userType.CLIENT){
          data.discount = data.percent;
          delete data.percent;
          addClientCategory(data, setLoyaltyCategories);
        }
        else{
          data.earningsPercent = data.percent;
          delete data.percent;
          addOwnerCategory(data, setLoyaltyCategories);
        }
        console.log("aaaa",data);
        close();
    };

    return (
      !!setLoyaltyCategories &&
    <div className="changeContainer" >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: -5,
              width: "120%",
            }}
          >
            <br />
            <div className="header">
            <div className="icon">
                <Avatar 
                    src={categoryIcon}
                    sx={{ width: 56, height: 56 }}>
                </Avatar> 
            </div>
            <div className="formTitle">
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ color: "#CC7351" }}
                >
                  Add loyalty category
                </Typography>
            </div>
            <div className="close">
                <Button size="large" onClick={() => close()} sx={{}}>
                  x
                </Button>
              </div>
            </div>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}><FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ mt: 3 }}>Category type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        required
                        onChange={handleCategoryChange}
                        defaultValue={userType.CLIENT}
                    >
                        <FormControlLabel value={userType.CLIENT} control={<Radio  color="secondary" sx={{fontSize:"12px"}}/>} label="Client category" />
                        <FormControlLabel value={userType.INSTRUCTOR} control={<Radio  color="secondary" sx={{fontSize:"12px"}}/>} label="Owner category" />
                    </RadioGroup>
                </FormControl>

                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="name"
                    id="name"
                    required
                    {...register("name", {required: true})}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Name
                  </FormHelperText>
                  {errors.name && (
                    <label className="errorLabel">
                      Required!
                    </label>
                  )}
                </FormControl>

                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="reservationPoints"
                    id="reservationPoints"
                    type="number"
                    required
                    {...register("reservationPoints", {required: true, pattern:/^[1-9]+[0-9]*$/})}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Points for successful reservation
                  </FormHelperText>
                  {errors.reservationPoints && (
                    <label className="errorLabel">
                      Only positive numbers are allowed!
                    </label>
                  )}
                </FormControl>

                
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="lowerLimit"
                    id="lowerLimit"
                    type="number"
                    required
                    {...register("lowLimitPoints", {required: true, pattern:/^[1-9]+[0-9]*$/})}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Lower limit of points
                  </FormHelperText>
                  {errors.lowerLimit && (
                    <label className="errorlowerLimitLabel">
                      Only positive numbers are allowed!
                    </label>
                  )}
                </FormControl>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="upperLimit"
                    id="upperLimit"
                    type="number"
                    required
                    {...register("heighLimitPoints", {required: true, pattern:/^[1-9]+[0-9]*$/})}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Upper limit of points
                  </FormHelperText>
                  {errors.heighLimitPoints && (
                    <label className="errorLabel">
                      Only positive number are allowed!
                    </label>
                  )}
                </FormControl>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="percent"
                    id="percent"
                    required
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  {...register("percent", {
                        pattern:/^100$|^\d{0,2}(\.\d{1,2})? *%?$/,
                        required: true,
                    })}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    {categoryType == userType.CLIENT ? "Discount on reservation" : "Earning percent from reservation"}
                  </FormHelperText>
                  {errors.percent && (
                    <p className="errorLabel">
                      Only numbers between 0 and 100 with a maximum of two decimal places are allowed!
                    </p>
                  )}
                </FormControl>

                <div className="colorPickerContainer"> 
                    <label className="chooseColor">Choose category color</label>
                    <br/>
                    <div className="colorPicker">

                        <BlockPicker
                        color={color}
                        onChange={(color) => {setColor(color.hex)}}
                        />
                    </div>
                  
                </div>

               
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width:"40%", marginLeft:"30%", minWidth:"100px"}}
              >
                Confirm
              </Button>

              <div>
                <br />
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>

    );
}

export default AddLoyaltyCategory;