import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function RatingPicker({ stars, setStars }) {

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Rate the offer</Typography>
      <Rating
        name="simple-controlled"
        value={stars}
        onChange={(event, newValue) => {
            if(newValue != null){
                setStars(newValue);
            }
        }}
      />
    </Box>
  );
}