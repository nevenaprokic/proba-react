import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {deleteAdventure } from "../../../services/AdventureService";
import adventure from '../../../adventure.png';


export default function DeleteAdventure({closeDialog, open, name, id}) {
    const handleClose = () => {
        closeDialog();
    }
    const handleDelete = () => {
        console.log("tu");
        async function isDeleted(){
            await  deleteAdventure(id);
            window.location = "/user-home-page/instructor";
        }
        isDeleted();
        
    }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        <img src={adventure} />
          {"\t\tDELETE"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {name} adventure?
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
}
