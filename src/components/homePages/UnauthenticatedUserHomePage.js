import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainNavigation from "../layout/MainNavigation";
import Search from "../forms/search/Search";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { offerType, userType } from "../../app/Enum";
import Grid from "@mui/material/Grid";
import OfferList from "../collections/OfferList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function UnauthenticatedUserHomePage() {
  const [value, setValue] = useState(0);
  const [offers, setOffers] = useState();

  const [params, setParams] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    name: "",
    address: "",
    maxPeople: -1,
    price: -1,
  });

  const resetParams = () => {
    setParams({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      name: "",
      address: "",
      maxPeople: -1,
      price: -1,
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    resetParams();
  };

  const outerTheme = createTheme({
    palette: {
      primary: { main: "#CC7351" },
      secondary: { main: "#9DAB86" },
    },
  });
  const secondaryTheme = createTheme({
    palette: {
      primary: { main: "#9DAB86" },
      secondary: { main: "#ffffff" },
    },
  });
  return (
    <ThemeProvider theme={outerTheme}>
      <MainNavigation />
      <Container maxWidth="100%">
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            maxWidth: "100%",
          }}
        >
          <CssBaseline />
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            textColor="primary"
            indicatorColor="primary"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Cottages" {...a11yProps(0)} />
            <Divider />
            <Tab label="Ships" {...a11yProps(1)} />
            <Divider />
            <Tab label="Instructors" {...a11yProps(2)} />
            <Divider />
          </Tabs>
          <TabPanel value={value} index={0}>
            <p
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                fontSize: "30px",
                color: "#CC7351",
              }}
            >
              Search
              <SearchIcon />
            </p>
            <Divider />
            <br />
            <br />
            <Box sx={{ flexGrow: 1 }}>
              <Grid item xs={12}>
                <Search
                  params={params}
                  setParams={setParams}
                  type={offerType.COTTAGE}
                  setOffers={setOffers}
                />
              </Grid>
            </Box>
            <OfferList
              type={offerType.COTTAGE}
              offers={offers}
              setOffers={setOffers}
            />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <p
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                fontSize: "30px",
                color: "#CC7351",
              }}
            >
              Search
              <SearchIcon />
            </p>
            <Divider />
            <br />
            <br />
            <Box sx={{ flexGrow: 1 }}>
              <Grid item xs={12}>
                <Search
                  params={params}
                  setParams={setParams}
                  type={offerType.SHIP}
                  setOffers={setOffers}
                />
              </Grid>
            </Box>
            <OfferList
              type={offerType.SHIP}
              offers={offers}
              setOffers={setOffers}
            />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <p
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                fontSize: "30px",
                color: "#CC7351",
              }}
            >
              Search
              <SearchIcon />
            </p>
            <Divider />
            <br />
            <br />
            <Box sx={{ flexGrow: 1 }}>
              <Grid item xs={12}>
                <Search
                  params={params}
                  setParams={setParams}
                  type={offerType.ADVENTURE}
                  setOffers={setOffers}
                />
              </Grid>
            </Box>
            <OfferList
              type={userType.INSTRUCTOR}
              offers={offers}
              setOffers={setOffers}
            />
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
