import "../../../style/AddAdventurePage.scss";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import AdditionalServices from "../addtitionaServices/AdditionalServices";
import { useState } from "react";
import UploadPictureForm from "../imageUpload/UploadPictureForm";
import { useForm } from "react-hook-form";
import { addCottage } from "../../../services/CottageService";
import cottage from '../../../cottage.png';

function AddCottagePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});
  const [additionalServicesInputList, setInputList] = useState([
    { serviceName: "", servicePrice: "" },
  ]);
  const [pictureInputList, pictureSetInputList] = useState([]);
  const [submitForm, setSubmitForm] = useState(false);

  const onSubmit = (data) => {
    let formData = new FormData();
    pictureInputList.forEach(element => {
      formData.append("photos", element, element.name);
    });
        
    console.log(formData.get("photos"));
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('street', data.street);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('rulesOfConduct', data.rulesOfConduct);
    formData.append('peopleNum', data.peopleNum);
    formData.append('cancelationConditions', data.cancelationConditions);
    formData.append('offerName', data.offerName);
    formData.append('roomNumber', data.roomNumber);
    formData.append('bedNumber', data.bedNumber);

    addCottage(formData, additionalServicesInputList);
    setSubmitForm(true);
  };

  return (
    <div className="formContainerAdd">
      <Typography variant="h6" gutterBottom>
        <img style={{ verticalAlign: '-10' }} src={cottage} />
        {"\t\tAdding new cottage"}
      </Typography>
      <Typography gutterBottom>
        <label className="headerText">
          Fields marked with an asterisk (*) are required.
        </label>
        <br />
        <label className="headerText">
          Prices are entered in euros with a maximum of two decimal places.
        </label>
      </Typography>
      <Grid
        container
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ marginTop: "2%" }}
      >
        <Grid item xs={12}>
          <TextField
            required
            id="offerName"
            label="Offer name"
            fullWidth
            defaultValue=""
            {...register("offerName", { required: true })}
          />
          {errors.offerName && (
            <label className="requiredLabel">Required! </label>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="peopleNum"
            label="Maximum number of people"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
            {...register("peopleNum", {
              required: true,
              pattern: /^[1-9]+[0-9]*$/,
            })}
          />
          {errors.peopleNum && (
            <label className="requiredLabel">
              Required! Only positive numbers are allowed
            </label>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            id="price"
            type="number"
            required
            InputProps={{
              startAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
            {...register("price", {
              required: true,
              pattern: /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/,
            })}
          />
          {errors.price && (
            <label className="requiredLabel">
              Required! Only numbers with a maximum of two decimal places are
              allowed
            </label>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="roomNumber"
            label="Number of rooms"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
            {...register("roomNumber", {
              required: true,
              pattern: /^[1-9]+[0-9]*$/,
            })}
          />
          {errors.roomNumber && (
            <label className="requiredLabel">
              Required! Only positive numbers are allowed
            </label>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Number of beds"
            id="bedNumber"
            type="number"
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("bedNumber", {
              required: true,
              pattern: /^[1-9]+[0-9]*$/,
            })}
          />
          {errors.bedNumber && (
            <label className="requiredLabel">
              Required! Only positive numbers are allowed
            </label>
          )}
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="street"
            name="street"
            label="Street"
            fullWidth
            {...register("street", {
              required: true,
              pattern: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
            })}
          />
          {errors.street && (
            <label className="requiredLabel">
              Required! Only letters, numbers and spaces are allowed
            </label>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            {...register("city", { required: true, pattern: /^[a-zA-Z\s]*$/ })}
          />
          {errors.city && (
            <label className="requiredLabel">
              Required! Only letters and spaces are allowed
            </label>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="state"
            name="state"
            label="State"
            fullWidth
            {...register("state", { required: true, pattern: /^[a-zA-Z\s]*$/ })}
          />
          {errors.state && (
            <label className="requiredLabel">
              Required! Only letters and spaces are allowed
            </label>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            label="Description"
            multiline
            rows={4}
            defaultValue=""
            fullWidth
            {...register("description", { required: true })}
          />
          {errors.description && (
            <label className="requiredLabel">Required! </label>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="rulesOfConduct"
            label="Rules of conduct"
            multiline
            rows={4}
            defaultValue=""
            fullWidth
            {...register("rulesOfConduct")}
          />
        </Grid>
        <Grid item xs={12}>
          <UploadPictureForm
            pictureSetInputList={pictureSetInputList}
            pictureInputList={pictureInputList}
          />
        </Grid>
        <Grid item xs={12}>
          <AdditionalServices
            errors={errors}
            registerForm={register}
            inputList={additionalServicesInputList}
            setInputList={setInputList}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="cancelationConditions"
            label="Cancellation conditions"
            multiline
            rows={3}
            defaultValue=""
            fullWidth
            required
            {...register("cancelationConditions", { required: true })}
          />
          {errors.description && (
            <label className="requiredLabel">Required! </label>
          )}
        </Grid>
        <Grid item xs={12} sm={4} sx={{ marginLeft: "35%" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ float: "right" }}
            color="success"
            fullWidth
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddCottagePage;
