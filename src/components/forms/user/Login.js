import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "../../layout/Card";
import { useForm } from "react-hook-form";
import api from "../../../app/api";
import jwt from "jwt-decode";
import MainNavigation from "../../layout/MainNavigation";
import { userType } from "../../../app/Enum";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();
const theme = createTheme({
  palette: {
    primary: { main: "#9DAB86" },
  },
});

export default function LogIn() {
  let homePages = {
    [userType.CLIENT]: "/home-page/client",
    [userType.INSTRUCTOR]: "/user-home-page/instructor",
    [userType.COTTAGE_OWNER]: "/user-profile/cottage-owner",
    [userType.SHIP_OWNER]: "/user-profile/ship-owner",
    [userType.ADMIN]: "/user-home-page/admin",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    api
      .post("auth/login", data)
      .then((res) => {
        const token = res.data.accessToken;
        // dekodiranje tokena, da dobijes podatke
        localStorage.setItem("user", token);
        openUserHomePage(token);
      })
      .catch((err) => {
        toast.error("Username or password is not correct.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        });
      });
  };
  function openUserHomePage(token) {
    //prepraviti da se otvara home page za svaku rolu posebno
    //window.location = "/user-home-page/instructor";
    let homePageLocation = homePages[jwt(token).role.name];
    if (!!homePageLocation) {
      window.location = homePageLocation;
    } else {
      alert("Undefined user role");
    }
  }

  return (
    <Card>
      <ThemeProvider theme={theme}>
        <MainNavigation />
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://www.parkettkaiser.de/media/catalog/product/p/a/parkettkaiser-skaben-fototapete-natur-palmen-blau-gruen-055811_r.jpg?width=265&height=265&store=eu-en&image-type=image)",
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
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  {...register("email", {
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                />
                <div>
                  <br />
                  <br />
                  <br />
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={theme.secondary}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/registration" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Card>
  );
}
