import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "../../layout/Card";
import { NativeSelect, InputLabel, FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import api from "../../../app/api";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import SuccessfulRegistration from "../../notifications/SuccessfulRegistration";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import MainNavigationHome from "../../layout/MainNavigation";
import { userType } from "../../../app/Enum";

const theme = createTheme({
  palette: {
    primary: { main: "#9DAB86" },
  },
});
export default function RegistrationOwner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    api
      .post("/user/registration-owner", data)
      .then(() => {
        handleOpen();
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        });
      });
  };

  return (
    <Card>
      <ThemeProvider theme={theme}>
        <MainNavigationHome />
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://www.parkettkaiser.de/media/catalog/product/p/a/parkettkaiser-skaben-fototapete-natur-palmen-blau-gruen-055811_r.jpg?width=265&height=265&store=eu-en&image-type=image)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                <br />
              </div>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2} width={"70%"} marginLeft={"15%"}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      variant="standard"
                      {...register("firstName", {
                        pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                      })}
                    />
                    {errors.firstName && (
                      <p style={{ color: "#ED6663" }}>
                        Please check the First Name
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      variant="standard"
                      {...register("lastName", {
                        pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                      })}
                    />
                  </Grid>
                  {errors.firstName && (
                    <p style={{ color: "#ED6663" }}>
                      Please check the Last Name
                    </p>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      variant="standard"
                      type="email"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                  </Grid>
                  {errors.firstName && (
                    <p style={{ color: "#ED6663" }}>Please check the Email</p>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="password"
                      variant="standard"
                      {...register("password")}
                    />
                  </Grid>
                  {errors.firstName && (
                    <p style={{ color: "#ED6663" }}>
                      Please check the Password
                    </p>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="confirmPassword"
                      variant="standard"
                      {...register("confirmPassword", {
                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match!",
                      })}
                    />
                    {errors.confirmPassword && (
                      <p style={{ color: "#ED6663" }}>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="phoneNumber"
                      label="Phone number"
                      type="tel"
                      id="phoneNumber"
                      autoComplete="phone-number"
                      variant="standard"
                      {...register("phoneNumber", {
                        required: true,
                        pattern:
                          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                      })}
                    />
                  </Grid>
                  {errors.firstName && (
                    <p style={{ color: "#ED6663" }}>
                      Please check the Phone Number
                    </p>
                  )}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="street"
                      name="street"
                      required
                      fullWidth
                      id="street"
                      label="Street"
                      variant="standard"
                      {...register("street", { pattern: /^[a-zA-Z0-9 ]+$/ })}
                    />
                  </Grid>
                  {errors.firstName && (
                    <p style={{ color: "#ED6663" }}>Please check the Street</p>
                  )}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      autoComplete="city"
                      variant="standard"
                      {...register("city", {
                        pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                      })}
                    />
                  </Grid>
                  {errors.firstName && (
                    <p style={{ color: "#ED6663" }}>Please check the City</p>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="state"
                      label="State"
                      id="state"
                      autoComplete="state"
                      variant="standard"
                      {...register("state", {
                        pattern: /[A-Z][a-z]+(?: +[A-Z][a-z]+)*/,
                      })}
                    />
                  </Grid>
                  {errors.firstName && (
                    <p style={{ color: "#ED6663" }}>Please check the State</p>
                  )}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="type">
                        Type of owner
                      </InputLabel>
                      <NativeSelect
                        defaultValue={userType.COTTAGE_OWNER}
                        {...register("type", { required: true })}
                        inputProps={{
                          name: "type",
                          id: "type",
                        }}
                      >
                        <option value={userType.INSTRUCTOR}>Instructor</option>
                        <option value={userType.COTTAGE_OWNER}>
                          Cottage owner
                        </option>
                        <option value={userType.SHIP_OWNER}>Ship owner</option>
                      </NativeSelect>
                    </FormControl>
                    <div>
                      <br />
                    </div>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="explanation"
                        autoComplete="explanation"
                        id="explanation"
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue="Explanation of registration"
                        variant="standard"
                        {...register("explanation")}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "40%", marginLeft: "30%" }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/log-in" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)" }}
                >
                  <SuccessfulRegistration />
                </Modal>
                <div>
                  <br />
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Card>
  );
}
