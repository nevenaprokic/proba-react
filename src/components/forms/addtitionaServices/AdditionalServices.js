import "../../../style/AddAdventurePage.scss";
import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { green } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function AdditionalServices({ inputList, setInputList, errors, registerForm }) {
  const handleInputChange = function (index, e) {
    const value = e.target.value;
    const list = [...inputList];
    list[index][this] = value.toString();
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { serviceName: "", servicePrice: "" }]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <label className="titleAdditional">Additional services</label>
      </Grid>
      {/* TODO : mozda je greska */}
      {inputList?.map((x, i) => {
        return (
          <>
            <Grid item xs={12} sm={7.5}>
              <TextField
                label="Service Description"
                fullWidth
                value={x.serviceName}
                defaultValue={x.serviceName}
                onChange={handleInputChange.bind("serviceName", i)}
                placeholder="Name"
              />
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <TextField
                fullWidth
                label="Price"
                value={x.servicePrice}
                defaultValue={x.servicePrice}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
                onChange={handleInputChange.bind("servicePrice", i)}
              >
                {errors[`servicePrice${i}`] && (
                  <label className="requiredLabel">
                    Required!Only numbers with a maximum of two decimal places
                    are allowed
                  </label>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2}>
              {inputList.length !== 1 && (
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => handleRemoveClick(i)}
                >
                  <DeleteIcon sx={{ fontSize: 30 }} />
                </IconButton>
              )}

              {inputList.length - 1 === i && (
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => handleAddClick(i)}
                >
                  <AddCircleIcon sx={{ color: "#CC7351", fontSize: 35 }} />
                </IconButton>
              )}
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}

export default AdditionalServices;
