
  import { DialogTitle, Dialog, DialogActions, DialogContent } from '@mui/material';
  import Button from "@mui/material/Button";
  import Box from '@mui/material/Box';
  import IconButton from '@mui/material/IconButton';
  import Typography from '@mui/material/Typography';
  
  function ConfirmDialog({close, cbOnConfirm, message}) {
    return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm the action</DialogTitle>
        <Box position="absolute" top={0} right={0}>
        </Box>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={ () => {
              close();
          }}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={ () => {
              cbOnConfirm();
              close();
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmDialog;