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
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import categoryIcon from "../../images/laurel.png";
import { BlockPicker } from "react-color";
import { useState } from "react";
import {
  updateClientCategory,
  updateOwnerCategory,
} from "../../../services/LoyaltyService";

function ChangeLoyaltyCategory({
  loyaltyCategory,
  close,
  categoryType,
  setLoyaltyCategories,
}) {
  const [color, setColor] = useState(loyaltyCategory.categoryColor);

  const updateFunction = {
    [userType.CLIENT]: updateClientCategory,
    [userType.OWNER]: updateOwnerCategory,
  };

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

  const onSubmit = (data) => {
    console.log(data);
    data.categoryColor = color;
    data.id = loyaltyCategory.id;
    if (categoryType == userType.CLIENT) {
      data.discount = data.percent;
    } else {
      data.earningsPercent = data.percent;
    }
    updateFunction[categoryType](data, setLoyaltyCategories);
    close();
  };

  return (
    <div className="changeContainer">
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
                  sx={{ width: 56, height: 56 }}
                ></Avatar>
              </div>
              <div className="formTitle">
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ color: "#CC7351" }}
                >
                  Change loyalty category
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
              <Grid container spacing={2}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="name"
                    id="name"
                    defaultValue={loyaltyCategory.name}
                    {...register("name")}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Name
                  </FormHelperText>
                </FormControl>

                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="reservationPoints"
                    id="reservationPoints"
                    type="number"
                    defaultValue={loyaltyCategory.reservationPoints}
                    {...register("reservationPoints")}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Points for successful reservation
                  </FormHelperText>
                  {errors.reservationPoints && (
                    <label className="errorLabel">
                      Only numbers are allowed!
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
                    defaultValue={loyaltyCategory.lowLimitPoints}
                    type="number"
                    {...register("lowLimitPoints")}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Lower limit of points
                  </FormHelperText>
                  {errors.lowerLimit && (
                    <label className="errorlowerLimitLabel">
                      Only numbers are allowed!
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
                    defaultValue={loyaltyCategory.heighLimitPoints}
                    type="number"
                    {...register("heighLimitPoints")}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Upper limit of points
                  </FormHelperText>
                  {errors.heighLimitPoints && (
                    <label className="errorLabel">
                      Only number are allowed!
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
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    defaultValue={
                      categoryType == userType.CLIENT
                        ? loyaltyCategory.discount
                        : loyaltyCategory.earningsPercent
                    }
                    {...register("percent", {
                      pattern: /^100$|^\d{0,2}(\.\d{1,2})? *%?$/,
                    })}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    {categoryType == userType.CLIENT
                      ? "Discount on reservation"
                      : "Earning percent from reservation"}
                  </FormHelperText>
                  {errors.percent && (
                    <p className="errorLabel">
                      Only numbers with a maximum of two decimal places are
                      allowed
                    </p>
                  )}
                </FormControl>
                <div className="colorPicker">
                  <BlockPicker
                    color={color}
                    onChange={(color) => {
                      setColor(color.hex);
                    }}
                  />
                </div>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "40%",
                  marginLeft: "30%",
                  minWidth: "100px",
                }}
              >
                Confirm changes
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

export default ChangeLoyaltyCategory;
