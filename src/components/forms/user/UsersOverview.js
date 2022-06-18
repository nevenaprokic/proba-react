import { useEffect, useState } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../../collections/RegistrationRequestsList.scss";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import removeIcon from "../../images/remove-user.png";
import Divider from "@mui/material/Divider";
import { userType } from "../../../app/Enum";
import { getAllAdmin, deleteAdmin } from "../../../services/AdminService";
import {
  getAllInstructors,
  deleteInstructor,
} from "../../../services/InstructorService";
import {
  getAllCottageOwners,
  deleteCottageOwner,
} from "../../../services/CottageOwnerService";
import {
  getAllShipOwner,
  deleteShipOwner,
} from "../../../services/ShipOwnerService";
import { getAllCLients, deleteClient } from "../../../services/ClientService";
import { usePickerState } from "@mui/x-date-pickers/internals/hooks/usePickerState";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getRoleFromToken } from "../../../app/jwtTokenUtils";

function Row({ user, setUsers, allUsers }) {
  const [open, setOpen] = React.useState(false);

  const getDeleteUserFunction = {
    [userType.INSTRUCTOR]: deleteInstructor,
    [userType.COTTAGE_OWNER]: deleteCottageOwner,
    [userType.SHIP_OWNER]: deleteShipOwner,
    [userType.CLIENT]: deleteClient,
    [userType.ADMIN]: deleteAdmin,
  };

  function handleDeleteAccount(isExpanded) {
    getDeleteUserFunction[user.role](user.id, allUsers, setUsers);
  }

  const theme = createTheme({
    palette: {
      primary: { main: "#CC7351" },
      secondary: { main: "#99A799" },
    },
  });

  if (!!user && !!setUsers) {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <label className="deatilsItem">details</label>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {user.firstName}
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {user.lastName}
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {user.role}
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {user.category}
            </TableCell>
            <TableCell>
              <Button
                type="submit"
                variant="contained"
                sx={{ float: "right" }}
                color="primary"
                size="small"
                onClick={() => handleDeleteAccount(user)}
              >
                Delete account
              </Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    User details
                  </Typography>
                  <br></br>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Email:
                    <label className="textItem"> {user.email} </label>
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="div"
                    sx={{ color: "#5f6d5f" }}
                  >
                    Address:
                    <label className="textItem">
                      {" "}
                      {`${user.street}, ${user.city}, ${user.state}`}{" "}
                    </label>
                  </Typography>
                  {user.role != userType.ADMIN && (
                    <Typography
                      variant="body1"
                      gutterBottom
                      component="div"
                      sx={{ color: "#5f6d5f" }}
                    >
                      Points from reservations:
                      <label className="textItem"> {user.points} </label>
                    </Typography>
                  )}
                  {user.role == userType.CLIENT && (
                    <Typography
                      variant="body1"
                      gutterBottom
                      component="div"
                      sx={{ color: "#5f6d5f" }}
                    >
                      Penalty:
                      <label className="textItem"> {user.penalty} </label>
                    </Typography>
                  )}
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      </ThemeProvider>
    );
  } else return null;
}

function UsersOveview() {
  const [users, setUsers] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [userRoles, setUserRoles] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [userNumber, setUserNumber] = useState();

  const getUsersFunction = {
    [userType.INSTRUCTOR]: getAllInstructors,
    [userType.COTTAGE_OWNER]: getAllCottageOwners,
    [userType.SHIP_OWNER]: getAllShipOwner,
    [userType.CLIENT]: getAllCLients,
    [userType.ADMIN]: getAllAdmin,
  };

  useEffect(() => {
    let roles = [
      { label: userType.CLIENT },
      { label: userType.COTTAGE_OWNER },
      { label: userType.SHIP_OWNER },
      { label: userType.INSTRUCTOR },
      { label: userType.ADMIN },
    ];

    setUserRoles(roles);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setTableData(selectedRole, newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setTableData(selectedRole, 0, +event.target.value);
  };

  const handleRoleChange = (event, selectedItem) => {
    if (!selectedItem) return;
    setSelectedRole(selectedItem.label);
    setTableData(selectedItem.label, page, rowsPerPage);
  };

  function setTableData(role, selectedPage, selectedPageSize) {
    async function set() {
      console.log(role);
      const response = await getUsersFunction[role](
        selectedPage,
        selectedPageSize
      );
      setUsers(!!response.data ? response.data : {});
      setUserNumber(
        !!response.data.length > 0 ? response.data[0].userNumber : 0
      );
      return response;
    }
    set();
  }

  if (!!userRoles) {
    return (
      <div className="requestsC ontainer">
        <Typography variant="h6" sx={{ color: "#5f6d5f" }}>
          As an administrator, you can delete any account if it doesn't have
          future reservations.
        </Typography>
        <Divider />
        <br />
        <Typography variant="body1" sx={{ color: "#5f6d5f" }}>
          Select the user type
        </Typography>
        <br />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={userRoles}
          sx={{ width: 250 }}
          onChange={(event, newValue) => {
            handleRoleChange(event, newValue);
          }}
          renderInput={(params) => <TextField {...params} label="User type" />}
        />
        <br />
        {!!users && (
          <>
            <TableContainer component={Paper} className="tableContainer">
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow sx={{ borderBottom: "solid #99A799" }}>
                    <TableCell>
                      <img width="60" height={"60"} src={removeIcon}></img>{" "}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#5f6d5f",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <Typography variant="button">First name</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#5f6d5f",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <Typography variant="button">Last name</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#5f6d5f",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <Typography variant="button">Role</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#5f6d5f",
                        fontSize: 18,
                      }}
                      align="center"
                    >
                      <Typography variant="button">User category</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => (
                    <Row
                      key={row.id}
                      user={row}
                      setUsers={setUsers}
                      allUsers={users}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[1, 2, 10]}
              component="div"
              count={userNumber}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {userNumber === 0 && (
              <Typography variant="h6" sx={{ color: "#CC7351" }}>
                There are currently no users for selected type
                {getRoleFromToken() === userType.ADMIN && ", except you"}
              </Typography>
            )}
          </>
        )}
      </div>
    );
  } else return null;
}

export default UsersOveview;
