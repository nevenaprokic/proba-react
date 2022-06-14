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
import MainNavigationHome from "../layout/MainNavigationHome";
import ClientSearch from "../forms/search/ClientSearch";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import ClientProfile from "../profilePages/userProfile/ClientProfile";
import Grid from "@mui/material/Grid";
import OfferList from "../collections/OfferList";
import { offerType } from "../../app/Enum";
import ClientFilter from "../forms/search/ClientFilter";
import { userType } from "../../app/Enum";
import ReservationProfile from "../profilePages/reservationProfile/ReservationProfile";
import CottageIcon from "@mui/icons-material/Cottage";
import SailingIcon from "@mui/icons-material/Sailing";
import KayakingIcon from "@mui/icons-material/Kayaking";
import UpcomingReservations from "../collections/UpcomingReservations";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Subscriptions from "../collections/Subscriptions";

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

export default function ClientHomePage() {
  const [value, setValue] = useState(0);
  const [offers, setOffers] = useState();
  let tommorowDate = new Date();
  tommorowDate.setDate(tommorowDate.getDate() + 1);

  const [lastSearchedOffers, setLastSearchedOffers] = useState();

  const [params, setParams] = useState({
    name: "",
    firstName: "",
    lastName: "",
    description: "",
    address: "",
    date: tommorowDate,
  });

  const [filter, setFilter] = useState({
    maxRating: 5,
    maxPrice: 500,
    maxPeople: 50,
    minPeople: 0,
    minPrice: 0,
    minRating: 0,
  });

  const resetParams = () => {
    setParams({
      name: "",
      firstName: "",
      lastName: "",
      description: "",
      address: "",
      date: tommorowDate,
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
      <MainNavigationHome />
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
            sx={{ borderRight: 1, borderColor: "divider", minWidth: "20%" }}
          >
            <Tab label="Profile page" {...a11yProps(0)} />
            <Divider />
            <Tab label="Subscriptions" {...a11yProps(1)} />
            <Divider />
            <Tab label="Upcoming reservations" {...a11yProps(2)} />
            <Divider />
            <Tab label="Reservation history" {...a11yProps(3)} />
            <Divider />
            <Tab label="Cottages" {...a11yProps(4)} />
            <Divider />
            <Tab label="Ships" {...a11yProps(5)} />
            <Divider />
            <Tab label="Instructors" {...a11yProps(6)} />
            <Divider />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ClientProfile></ClientProfile>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: "#5f6d5f" }}
            >
              <NotificationsIcon
                fontSize="large"
                style={{ verticalAlign: "-6" }}
              />
              {"\tSubscriptions"}
            </Typography>
            <Subscriptions />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: "#5f6d5f" }}
            >
              <CottageIcon fontSize="large" style={{ verticalAlign: "-6" }} />
              {"\t\tCottages"}
            </Typography>
            <UpcomingReservations offerT={offerType.COTTAGE} />
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: "#5f6d5f" }}
            >
              <SailingIcon fontSize="large" style={{ verticalAlign: "-6" }} />
              {"\tShips"}
            </Typography>
            <UpcomingReservations offerT={offerType.SHIP} />
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: "#5f6d5f" }}
            >
              <KayakingIcon fontSize="large" style={{ verticalAlign: "-6" }} />
              {"\t\tAdventures"}
            </Typography>
            <UpcomingReservations offerT={offerType.ADVENTURE} />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: "#5f6d5f" }}
            >
              <CottageIcon fontSize="large" style={{ verticalAlign: "-6" }} />
              {"\t\tCottages"}
            </Typography>
            <ReservationProfile offerT={offerType.COTTAGE} />
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: "#5f6d5f" }}
            >
              <SailingIcon fontSize="large" style={{ verticalAlign: "-6" }} />
              {"\tShips"}
            </Typography>
            <ReservationProfile offerT={offerType.SHIP} />
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: "#5f6d5f" }}
            >
              <KayakingIcon fontSize="large" style={{ verticalAlign: "-6" }} />
              {"\t\tAdventures"}
            </Typography>
            <ReservationProfile offerT={offerType.ADVENTURE} />
          </TabPanel>
          <TabPanel value={value} index={8}>
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
                <ClientSearch
                  params={params}
                  setParams={setParams}
                  type={offerType.COTTAGE}
                  setOffers={setOffers}
                  setLastSearchedOffers={setLastSearchedOffers}
                />
                <br />
                <ClientFilter
                  params={filter}
                  setParams={setFilter}
                  type={offerType.COTTAGE}
                  lastSearchedOffers={lastSearchedOffers}
                  setOffers={setOffers}
                  offers={offers}
                />
                <br />
              </Grid>
            </Box>
            <OfferList
              type={offerType.COTTAGE}
              offers={offers}
              setOffers={setOffers}
              setLastSearchedOffers={setLastSearchedOffers}
            />
          </TabPanel>

          <TabPanel value={value} index={10}>
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
                <ClientSearch
                  params={params}
                  setParams={setParams}
                  type={offerType.SHIP}
                  setOffers={setOffers}
                  setLastSearchedOffers={setLastSearchedOffers}
                />
                <br />
                <ClientFilter
                  params={filter}
                  setParams={setFilter}
                  type={offerType.SHIP}
                  lastSearchedOffers={lastSearchedOffers}
                  setOffers={setOffers}
                  offers={offers}
                />
                <br />
              </Grid>
            </Box>
            <OfferList
              type={offerType.SHIP}
              offers={offers}
              setOffers={setOffers}
              setLastSearchedOffers={setLastSearchedOffers}
            />
          </TabPanel>

          <TabPanel value={value} index={12}>
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
                <ClientSearch
                  params={params}
                  setParams={setParams}
                  type={offerType.ADVENTURE}
                  setOffers={setOffers}
                  setLastSearchedOffers={setLastSearchedOffers}
                />
                <br />
                <ClientFilter
                  params={filter}
                  setParams={setFilter}
                  type={offerType.ADVENTURE}
                  lastSearchedOffers={lastSearchedOffers}
                  setOffers={setOffers}
                  offers={offers}
                />
                <br />
              </Grid>
            </Box>
            <OfferList
              type={userType.INSTRUCTOR}
              offers={offers}
              setOffers={setOffers}
              setLastSearchedOffers={setLastSearchedOffers}
            />
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
