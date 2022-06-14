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
import { changeAdminData } from "../../../services/AdminService";
import "../../../style/ChangeOwnerData.scss";

export default function ChangeAdminData({
  currentAdminData,
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
    console.log(data);
    childToParent(data);
    changeAdminData(data);
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
                    defaultValue={currentAdminData.firstName}
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
                    defaultValue={currentAdminData.lastName}
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
                    defaultValue={currentAdminData.phoneNumber}
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
                    defaultValue={currentAdminData.street}
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
                    defaultValue={currentAdminData.city}
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
                    defaultValue={currentAdminData.state}
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
