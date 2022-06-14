import { useState } from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChangeImageGallery from "./ChangeImageGallery";
import { styled } from "@mui/material/styles";

function ChangeImageForm({ images, setImages, childToParent }) {
  const Input = styled("input")({
    display: "none",
  });

  const getBase64StringFromDataURL = (dataURL) =>
    dataURL.replace("data:", "").replace(/^.+,/, "");

  const handlePictureUpload = function (e) {
    const selectedPictures = [...images];
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = getBase64StringFromDataURL(reader.result);
      selectedPictures.push(base64);
      setImages(selectedPictures);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Grid continer spacing={10}>
      <Grid item xs={12} sm={5}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => handlePictureUpload(e)}
          />
          <Button variant="contained" component="span" color="inherit">
            Upload photos
          </Button>
        </label>
      </Grid>
      <Grid>
        <label className="uploadPhotoLabel">
          You can add photos from previous adventures
        </label>
      </Grid>
      <Grid item xs={12}>
        <ChangeImageGallery images={images} setImages={setImages} />
      </Grid>
    </Grid>
  );
}

export default ChangeImageForm;
