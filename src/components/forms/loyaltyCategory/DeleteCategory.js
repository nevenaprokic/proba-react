import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  deleteClientCategory,
  deleteOwnerCategory,
  deleteCategory,
} from "../../../services/LoyaltyService";
import { userType } from "../../../app/Enum";
import categoryIcon from "../../images/laurel.png";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

export default function DeleteCategory({
  closeDialog,
  open,
  category,
  categoryType,
  setLoyaltyCategories,
}) {
  const handleClose = () => {
    closeDialog();
  };

  const deleteFunction = {
    [userType.CLIENT]: deleteClientCategory,
    [userType.OWNER]: deleteOwnerCategory,
  };

  const handleDelete = () => {
    console.log("tu");
    async function isDeleted() {
      await deleteFunction[categoryType](category.id, setLoyaltyCategories);
      closeDialog();
    }
    isDeleted();
  };

  if (!!setLoyaltyCategories) {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <CardHeader
              avatar={
                <Avatar
                  src={categoryIcon}
                  sx={{ width: 56, height: 56 }}
                ></Avatar>
              }
              title="DELETE"
              sx={{ fontSize: "35px", color: "#CC7351" }}
            />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {category.name} category?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleDelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else return null;
}
