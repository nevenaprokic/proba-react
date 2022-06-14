import {
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RatingPicker from "./RatingPicker";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import * as React from "react";
import { makeReviewForOffer } from "../../../services/ClientService";

function ReviewForm({ close, offer }) {
  const [stars, setStars] = React.useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({});

  const onSubmit = (data) => {
    makeReviewForOffer(stars, offer.id, getValues("comment"));
    close();
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Thank you for the feedback</DialogTitle>
      <DialogContent>
        <RatingPicker stars={stars} setStars={setStars} />
        <br />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <TextField
              required
              id="comment"
              label="Review comment"
              multiline
              rows={4}
              defaultValue=""
              fullWidth
              {...register("comment", { required: true })}
            />
            {errors.comment && <p style={{ color: "#ED6663" }}>Required!</p>}
          </Grid>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                close();
              }}
            >
              Cancel
            </Button>
            <Button color="secondary" variant="contained" type="submit">
              Confirm
            </Button>
          </DialogActions>
          <div>
            <br></br>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewForm;
