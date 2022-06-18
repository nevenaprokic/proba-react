import { getAllDeleteAccountRequests } from "../../../services/AdminService";
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
import ShowMoreText from "react-show-more-text";
import "../../collections/RegistrationRequestsList.scss";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import table_icon from "../../images/reservation_report_icon.png";
import Divider from "@mui/material/Divider";
import DeleteAccountResponse from "./DeleteAccountResponse";
import { Modal } from "@mui/material";

function Row({ deleteRequest, setDeleteRequests, deleteRequests }) {
  const [open, setOpen] = React.useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  const theme = createTheme({
    palette: {
      primary: { main: "#CC7351" },
      secondary: { main: "#99A799" },
    },
  });

  function handleOpenResponse(del) {
    setDeleteAccount(del);
    setOpenResponse(true);
  }

  function handleCloseResponse() {
    setOpenResponse(false);
  }

  if (!!deleteRequest && !!setDeleteRequests) {
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
              {deleteRequest.role}
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {deleteRequest.userFirstName}
            </TableCell>
            <TableCell sx={{ fontSize: 16 }} align="center">
              {deleteRequest.userLastName}
            </TableCell>
            <TableCell>
              <Button
                type="submit"
                variant="contained"
                sx={{ float: "right" }}
                color="primary"
                size="small"
                onClick={() => handleOpenResponse(true)}
              >
                delete account
              </Button>
            </TableCell>
            <TableCell>
              <Button
                type="submit"
                variant="contained"
                sx={{ float: "right" }}
                color="primary"
                size="small"
                onClick={() => handleOpenResponse(false)}
              >
                reject request
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
                    Explanation
                  </Typography>
                  <div>
                    <ShowMoreText
                      lines={4}
                      more="Show more"
                      less="Show less"
                      className="content-css"
                      anchorClass="my-anchor-css-class"
                      onClick={executeOnClick}
                      expanded={false}
                      width={280}
                      truncatedEndingComponent={"... "}
                    >
                      {deleteRequest.reason}
                    </ShowMoreText>
                  </div>
                  <br></br>
                </Box>
              </Collapse>
            </TableCell>
            <Modal
              open={openResponse}
              onClose={handleCloseResponse}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ backgroundColor: "rgb(218, 224, 210, 0.6)" }}
            >
              <DeleteAccountResponse
                deleteRequest={deleteRequest}
                close={handleCloseResponse}
                setDeleteRequests={setDeleteRequests}
                allDeleteRequest={deleteRequests}
                isDelete={deleteAccount}
              />
            </Modal>
          </TableRow>
        </React.Fragment>
      </ThemeProvider>
    );
  } else return null;
}

function DeleteAccountRequests() {
  const [deleteRequests, setDeleteRequests] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function setData() {
      const responseData = await getAllDeleteAccountRequests();
      console.log(responseData.data);
      setDeleteRequests(!!responseData.data ? responseData.data : {});
    }
    setData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!!deleteRequests) {
    return (
      <div className="requestsC ontainer">
        <Typography variant="h6" sx={{ color: "#5f6d5f" }}>
          As an administrator, you can respond to requests to delete an account
        </Typography>
        <Divider />

        <TableContainer component={Paper} className="tableContainer">
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ borderBottom: "solid #99A799" }}>
                <TableCell>
                  <img width="60" height={"60"} src={table_icon}></img>{" "}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                  align="center"
                >
                  <Typography variant="button">User category</Typography>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                  align="center"
                >
                  <Typography variant="button">First name</Typography>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#5f6d5f", fontSize: 18 }}
                  align="center"
                >
                  <Typography variant="button">Last name</Typography>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(deleteRequests)}
              {deleteRequests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row
                    key={row.id}
                    deleteRequest={row}
                    setDeleteRequests={setDeleteRequests}
                    deleteRequests={deleteRequests}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={deleteRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {deleteRequests.length === 0 && (
          <Typography variant="h6" sx={{ color: "#CC7351" }}>
            There are currently no reservation reports for reviewing
          </Typography>
        )}
      </div>
    );
  } else return null;
}
export default DeleteAccountRequests;
