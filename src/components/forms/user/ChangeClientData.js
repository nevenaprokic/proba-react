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
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import { getUsernameFromToken } from "../../../app/jwtTokenUtils";
import api from "../../../app/api";
import { toast } from "react-toastify";

export default function ChangeClientData({
  currentClientData,
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

  const onSubmit = (data) => {
    childToParent(data);
    api
      .post("client/update-profile-info?email=" + getUsernameFromToken(), data)
      .then((res) => {
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
                <Button size="large" sx={{}} onClick={() => close()}>
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
                    defaultValue={currentClientData.firstName}
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
                    defaultValue={currentClientData.lastName}
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
                    defaultValue={currentClientData.phoneNumber}
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
                    defaultValue={currentClientData.street}
                    {...register("street", {
                      pattern: /^[a-zA-Z0-9 ]+$/,
                      required: true,
                    })}
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
                    defaultValue={currentClientData.city}
                    {...register("city", {
                      pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                      required: true,
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
                    defaultValue={currentClientData.state}
                    {...register("state", {
                      pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                      required: true,
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
