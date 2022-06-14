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
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import AdminProfile from "../profilePages/userProfile/AdminProfile";
import RegistrationRequestsList from "../collections/RegistrationRequestsList";
import LoyalyProgeramPage from "../loyalty/LoyaltyProgramPage";
import NotApprovedMarks from "../graphs/marks/NotApprovedMarks";
import AddAdmin from "../forms/user/AddAdmin";
import "../../style/AddAdminForm.scss";
import { getAdminByEmail } from "../../services/AdminService";
import ChangePassword from "../forms/user/ChangePassword";
import { Modal } from "@mui/material";
import ReservationReportsList from "../forms/reservations/ReservationReporstList";
import ComplaintList from "../forms/review/ComplaintsList";
import DeleteAccountRequests from "../forms/user/DeleteAccountRequests";

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

export default function AdminHomePage() {
  const [value, setValue] = useState(0);
  const [openPasswordForm, setOpenPasswordForm] = useState(false);
  const [adminData, setAdminData] = useState();
  const [updatePassword, setUpdatePassword] = useState(false);

  useEffect(() => {
    async function setAdmin() {
      const response = await getAdminByEmail();
      setAdminData(response.data ? response.data : {});
      if (response.data.firstLogin) {
        handleOpenPasswordForm();
      }
    }
    setAdmin();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const outerTheme = createTheme({
    palette: {
      primary: { main: "#CC7351" },
      secondary: { main: "#9DAB86" },
    },
  });

  function handleOpenPasswordForm() {
    setOpenPasswordForm(true);
  }

  function handleClosePasswordForm() {
    setOpenPasswordForm(false);
    if (updatePassword) {
      window.location = "/user-home-page/admin";
    } else {
    }
  }

  if (!!adminData) {
    if (!adminData.firstLogin) {
      if (!!setUpdatePassword) {
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
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    minWidth: "20%",
                  }}
                >
                  <Tab label="Home page" {...a11yProps(0)} />
                  <Divider />
                  <Tab label="Profile page" {...a11yProps(1)} />
                  <Divider />
                  <Tab label="Users" {...a11yProps(2)} />
                  <Tab label="Registration requests" {...a11yProps(3)} />
                  <Tab label="Unchecked marks" {...a11yProps(4)} />
                  <Tab label="Reservation reports" {...a11yProps(5)} />
                  <Tab label="Complaints" {...a11yProps(6)} />
                  <Tab label="Delete account requests" {...a11yProps(7)} />
                  <Divider />
                  <Tab label="Loyalty program" {...a11yProps(8)} />
                  <Divider />
                  <Tab label="Business reports" {...a11yProps(9)} />
                  <Divider />
                  {adminData.defaultAdmin && (
                    <Tab label="Add new admin" {...a11yProps(10)} />
                  )}
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
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <AdminProfile />
                </TabPanel>
                <TabPanel value={value} index={7}>
                  <ReservationReportsList />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <RegistrationRequestsList />
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <NotApprovedMarks />
                </TabPanel>
                <TabPanel value={value} index={8}>
                  <ComplaintList />
                </TabPanel>
                <TabPanel value={value} index={9}>
                  <DeleteAccountRequests />
                </TabPanel>
                <TabPanel value={value} index={11}>
                  <LoyalyProgeramPage />
                </TabPanel>
                {adminData.defaultAdmin && (
                  <TabPanel value={value} index={15}>
                    <AddAdmin />
                  </TabPanel>
                )}
              </Box>
            </Container>
          </ThemeProvider>
        );
      } else return null;
    } else {
      if (!!setUpdatePassword) {
        return (
          <Modal
            open={openPasswordForm}
            onClose={handleClosePasswordForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              backgroundColor: "rgb(218, 224, 210, 0.6)",
              overflow: "auto",
            }}
          >
            <ChangePassword
              close={handleClosePasswordForm}
              setUpdatePassword={setUpdatePassword}
            />
          </Modal>
        );
      } else return null;
    }
  } else return null;
}
