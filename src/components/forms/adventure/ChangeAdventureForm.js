import "../../../style/AddAdventurePage.scss" 
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from "@mui/material";
import AdditionalServices from '../addtitionaServices/AdditionalServices';
import { useState } from "react";
import ChangeImageForm from "../imageUpload/ChangeImageForm";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { updateAdventure } from "../../../services/AdventureService";
import adventure from '../../../adventure.png';

function ChangeAdventureForm({currentAdventureData, closeForm, childToParent}){

    const { register, handleSubmit, formState: { errors }, watch } = useForm({});
    const [additionalServicesInputList, setInputList] = useState([{ serviceName: "", servicePrice: "" }]);
    const [images, setImages] = useState([]);
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        async function setCurrentData(){
            let images = [];
            currentAdventureData.photos.forEach(photo => {
                let path = photo;
                images.push(path);
            });
            setImages(images);
            setCurrentAdditionalServices();
        }
        setCurrentData();

    }, []);
  

    const theme = createTheme({
        palette: {
          primary: { main: "#ADC2A9" },
          secondary: { main: "#ffffff" },
        },
      });

    const onSubmit = (data) => {
        data["id"] = currentAdventureData.id
        data["photos"] = images;
        data["additionalServices"] = additionalServicesInputList;
        updateAdventure(data, additionalServicesInputList);
       
        childToParent(data);
        setSubmitForm(true);
        closeForm();

    }

    function setCurrentAdditionalServices(){
        if(currentAdventureData.additionalServices.length === 0){
            setInputList([{ serviceName: "", servicePrice: "" }])
        }
        else{
            setInputList(currentAdventureData.additionalServices);
        }
    }
    
    
    return (
        <ThemeProvider theme={theme}>
        <div className="changeAdventureForm">
        <div className="closeFormBtn">
            <Button size="large" sx={{}} onClick={() => closeForm()}>
            x
            </Button>
        </div>
        <div>
            <Typography variant="h6" gutterBottom>
            <img src={adventure} />
                {"\t\tChange adventure"}
            </Typography>
        </div>
       
        <Grid container spacing={3} component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{marginTop:"2%"}}>
                <Grid item xs={12}>            
                    <TextField
                        id="offerName"
                        label="Offer name" 
                        fullWidth 
                        defaultValue={currentAdventureData.offerName}
                        {...register("offerName", {required:true})}            
                    />
                    {errors.offerName && <label className="requiredLabel">Name can't be empty!</label>}
                </Grid>

                <Grid item xs={12} sm={6} >
                <TextField
                    id="peopleNum"
                    label="Maximum nuber of people"
                    type="number"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    fullWidth
                    defaultValue={currentAdventureData.peopleNum} 
                    {...register("peopleNum", {required:true, pattern:/^[1-9]+[0-9]*$/})}
                />
                {errors.peopleNum && <label className="requiredLabel">Only positive numbers are allowed</label>}
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField 
                    fullWidth
                    label="Price"
                    id="price"
                    type="number"
                    InputProps={{
                    startAdornment: <InputAdornment position="end">€</InputAdornment>,
                    }}
                    defaultValue={currentAdventureData.price}
                    {...register("price", {required:true, pattern:/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/})}
                />
                {errors.price && <label className="requiredLabel">Only numbers with a maximum of two decimal places are allowed</label>}
                </Grid>
                

                <Grid item xs={12} sm={4}>
                    <TextField
                    id="street"
                    name="street"
                    label="Street"
                    fullWidth  
                    defaultValue={currentAdventureData.street}
                    {...register("street", {required:true, pattern:/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/})}
                    />
                    {errors.street && <label className="requiredLabel">Only letters, numbers and spaces are allowed</label>}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    defaultValue={currentAdventureData.city}
                    {...register("city", {required:true,pattern:/^[a-zA-Z\s]*$/})}
                    />
                     {errors.city && <label className="requiredLabel">Only letters and spaces are allowed</label>}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    defaultValue={currentAdventureData.state}
                    {...register("state", {required:true, pattern:/^[a-zA-Z\s]*$/})}
                    />
                    {errors.state && <label className="requiredLabel">Only letters and spaces are allowed</label>}
                </Grid>    
                <Grid item xs={12}>
                    <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    defaultValue={currentAdventureData.description}
                    {...register("description", {required:true})}
                    />
                    {errors.description && <label className="requiredLabel">Description can't be empty</label>}
                    </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="rulesOfConduct"
                    label="Rules of conduct"
                    multiline
                    rows={4}
                    fullWidth
                    defaultValue={currentAdventureData.rulesOfConduct}
                    {...register("rulesOfConduct")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="additionalEquipment"
                    label="Additional Equipment"
                    multiline
                    rows={4}
                    fullWidth
                    defaultValue={currentAdventureData.additionalEquipment}
                    {...register("additionalEquipment")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ChangeImageForm images={images} setImages={setImages} childToParent={childToParent}/>
                </Grid>
                <Grid  item xs={12}>
                    <AdditionalServices errors={errors} registerForm={register} inputList={additionalServicesInputList} setInputList={setInputList} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="cancelationConditions"
                    label="Cancellation conditions"
                    multiline
                    rows={3}
                    fullWidth
                    defaultValue={currentAdventureData.cancelationConditions}
                    {...register("cancelationConditions", {required:true})}
                    />
                    {errors.cancelationConditions && <label className="requiredLabel">Cancellation conditions can't be empty</label>}
                </Grid>
                <Grid item xs={12} sm={4} sx={{marginLeft:"35%"}}>
                    <Button 
                        type="submit"
                        variant="contained"
                        sx={{float:"right"}}
                        fullWidth
                        color="primary"
                    >
                    Confirm 
                    </Button>
                </Grid>

            </Grid>
            
        </div>
        </ThemeProvider>
    );

}

export default ChangeAdventureForm;