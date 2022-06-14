import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import { getRoleFromToken } from "../../../app/jwtTokenUtils";
import { changeInstructorData } from "../../../services/InstructorService";
import { changeCottageOwnerData } from "../../../services/CottageOwnerService";
import { changeShipOwnerData } from "../../../services/ShipOwnerService";

export default function ChangeOwnerData({
  currentOwnerData,
  close,
  childToParent,
}) {
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

  let changeData = {
    [userType.COTTAGE_OWNER]: changeCottageOwnerData,
    [userType.INSTRUCTOR]: changeInstructorData,
    [userType.SHIP_OWNER]: changeShipOwnerData,
  };

  const onSubmit = (data) => {
    let role = getRoleFromToken();
    changeData[role](data);
    childToParent(data);
    close();
  };

  return (
    <div className="changeDataContainer" id="changeDataContainer">
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
            <div>
              <br />
            </div>
            <div className="header">
              <div className="tittle">
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ color: "#CC7351" }}
                >
                  Change data
                </Typography>
              </div>
              <div className="closeBtn">
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
                    name="firstName"
                    id="firstName"
                    defaultValue={currentOwnerData.firstName}
                    {...register("firstName", {
                      pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                    })}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    First Name
                  </FormHelperText>
                  {errors.firstName && (
                    <label className="errorLabel">
                      Only letters are allowed!
                    </label>
                  )}
                </FormControl>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="lastName"
                    id="lastName"
                    defaultValue={currentOwnerData.lastName}
                    {...register("lastName", {
                      pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                    })}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Last Name
                  </FormHelperText>
                  {errors.lastName && (
                    <label className="errorLabel">
                      Only letters are allowed!
                    </label>
                  )}
                </FormControl>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="phoneNumber"
                    id="phoneNumber"
                    defaultValue={currentOwnerData.phoneNumber}
                    {...register("phoneNumber", {
                      pattern:
                        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    })}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Phone number
                  </FormHelperText>
                  {errors.phoneNumber && (
                    <p className="errorLabel">
                      Allowed phone number formats:
                      <br /> '###-###-*####' <br />
                      '(###) ###-####' <br />
                      '### ### ####' <br />
                      '###.###.####' <br />
                      '+## (###) ###-####' <br />
                      '##########' <br />
                    </p>
                  )}
                </FormControl>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="street"
                    id="street"
                    defaultValue={currentOwnerData.street}
                    {...register("street", { pattern: /^[a-zA-Z0-9 ]+$/ })}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Street
                  </FormHelperText>
                  {errors.street && (
                    <label className="errorLabel">
                      Only letters, numbers and spaces are allowed!
                    </label>
                  )}
                </FormControl>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="city"
                    id="city"
                    defaultValue={currentOwnerData.city}
                    {...register("city", {
                      pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                    })}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    City
                  </FormHelperText>
                  {errors.city && (
                    <label className="errorLabel">
                      Only letters and spaces are allowed!
                    </label>
                  )}
                </FormControl>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, mt: 3, width: "25ch" }}
                >
                  <Input
                    name="state"
                    id="state"
                    defaultValue={currentOwnerData.state}
                    {...register("state", {
                      pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                    })}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    State
                  </FormHelperText>
                  {errors.state && (
                    <label className="errorLabel">
                      Only letters and spaces are allowed!
                    </label>
                  )}
                </FormControl>
                {getRoleFromToken() === userType.INSTRUCTOR && (
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, mt: 3, width: "95%" }}
                  >
                    <TextField
                      id="biography"
                      multiline
                      defaultValue={currentOwnerData.biography}
                      variant="standard"
                      {...register("biography")}
                    />
                  </FormControl>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
