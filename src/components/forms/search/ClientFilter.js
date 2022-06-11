import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { offerType } from "../../../app/Enum";
import { filterCottagesClient } from "../../../services/CottageService";
import { filterShipsClient } from "../../../services/ShipService";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Slider from "@mui/material/Slider";
import { sortCottages } from "../../../services/CottageService";
import { sortShips } from "../../../services/ShipService";
import { useState } from "react";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import Rating from "@mui/material/Rating";
import { useEffect } from "react";
import { filterInstructorsClient, sortInstructors } from "../../../services/InstructorService";


function getValue(value) {
  return `${value}`;
}

const stars = [
  { title: <Rating name="half-rating-read" value={0} readOnly />, star: "0" },
  { title: <Rating name="half-rating-read" value={1} readOnly />, star: "1" },
  { title: <Rating name="half-rating-read" value={2} readOnly />, star: "2" },
  { title: <Rating name="half-rating-read" value={3} readOnly />, star: "3" },
  { title: <Rating name="half-rating-read" value={4} readOnly />, star: "4" },
  { title: <Rating name="half-rating-read" value={5} readOnly />, star: "5" },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// function getMinNumPeople(offers) {
//   console.log(offers);
//   const totals = offers.map((x) => x.numberOfPerson);
//   return Math.min(...totals);
// }
// function getMaxNumPeople(offers) {
//   const totals = offers.map((x) => x.numberOfPerson);
//   return Math.max(...totals);
// }

export default function ClientFilter({
  params,
  setParams,
  setOffers,
  type,
  lastSearchedOffers,
  offers,
}) {
  
  const [valueNumPeople, setValueNumPeople] = React.useState([
    0,
    50,
  ]);
  const [valuePrice, setValuePrice] = React.useState([20, 300]);
  const [valueRating, setValueRating] = React.useState([0, 5]);

  const handleChangePeopleNumber = (event, newValue, activeThumb) => {
    setParams({ ...params, minPeople: newValue[0], maxPeople: newValue[1] });
    if (!Array.isArray(newValue)) {
      return;
    }
    setValueNumPeople(newValue);
  };
  const handleChangePrice = (event, newValue, activeThumb) => {
    setParams({ ...params, minPrice: newValue[0], maxPrice: newValue[1] });
    if (!Array.isArray(newValue)) {
      return;
    }
    setValuePrice(newValue);
  };

  const handleChangeRating = (event, newValue, activeThumb) => {
    setParams({ ...params, minRating: newValue[0], maxRating: newValue[1] });
    if (!Array.isArray(newValue)) {
      return;
    }
    setValueRating(newValue);
  };

  const [sortAsc, setSortAsc] = useState(true);
  const [criteria, setCriteria] = useState(3);

  let sortOffers = {
    [offerType.COTTAGE]: sortCottages,
    [offerType.SHIP]: sortShips,
    [offerType.ADVENTURE]: sortInstructors,
  };

  const criteriaChanged = (event) => {
    let value = event.target.value;
    setCriteria(value);
    sortOffers[type](value, sortAsc, offers, setOffers);
  };

  const orderChanged = () => {
    sortOffers[type](criteria, !sortAsc, offers, setOffers);
    setSortAsc(!sortAsc);
  };

  let filterOffer = {
    [offerType.COTTAGE]: filterCottagesClient,
    [offerType.SHIP]: filterShipsClient,
    [offerType.ADVENTURE]: filterInstructorsClient,
  };

  const resetFields = () => {
    setParams({
      maxRating: 5,
      maxPrice: 500,
      maxPeople: 50,
      minPeople: 0,
      minPrice: 0,
      minRating: 0
    });
  };

  const handleReset = () => {
    setValueRating([0, 5]);
    setValueNumPeople([0, 50]);
    setValuePrice([0, 500]);
    setOffers(lastSearchedOffers);
    resetFields();
  };

  const sendParams = () => {
    filterOffer[type](params, setOffers, lastSearchedOffers);
  };

  useEffect(() => {
  }, [offers]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={5}>
        <Grid item>
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">
              Sorting
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={criteria}
              label="Criteria"
              onChange={criteriaChanged}
            >
              {type == offerType.ADVENTURE && <MenuItem value={8}>First Name</MenuItem>}
              {type == offerType.ADVENTURE && (
              <MenuItem value={9}>Last Name</MenuItem>
              )}
              {type != offerType.ADVENTURE &&  <MenuItem value={1}>Name</MenuItem> }
              <MenuItem value={2}>Street</MenuItem>
              <MenuItem value={3}>City</MenuItem>
              {type != offerType.ADVENTURE && <MenuItem value={4}>Rating</MenuItem> }
              {type != offerType.ADVENTURE &&  <MenuItem value={5}>Price</MenuItem> }
              {type == offerType.SHIP && <MenuItem value={6}>Size</MenuItem>}
              {type == offerType.SHIP && (
                <MenuItem value={7}>Max speed</MenuItem>
              )}
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              orderChanged();
            }}
          >
            {" "}
            {sortAsc ? (
              <ArrowUpwardTwoToneIcon fontSize="large" />
            ) : (
              <ArrowDownwardTwoToneIcon fontSize="large" />
            )}{" "}
          </Button>
        </Grid>
        <Grid item xs>
        <Typography
            id="input-slider"
            gutterBottom
            style={{ textAlign: "center"}}
          >
            Rating
          </Typography>
          <Slider
            getAriaLabel={() => "Minimum distance shift"}
            value={valueRating}
            onChange={handleChangeRating}
            valueLabelDisplay="auto"
            getAriaValueText={getValue}
            disableSwap
            style={{ width: 170 }}
            defaultValue={[2, 20]}
            max={5}
            min={0}
          />
          <Typography
            id="input-slider"
            gutterBottom
            style={{ textAlign: "center"}}
          >
            {valueRating[0] + " - " + valueRating[1]}
          </Typography>
        </Grid>
        <Grid item xs>
          { type != offerType.ADVENTURE && 
              <>
                  <Typography
            id="input-slider"
            gutterBottom
            style={{ textAlign: "center"}}
          >
            Number of person
          </Typography>
          <Slider
            getAriaLabel={() => "Minimum distance shift"}
            value={valueNumPeople}
            onChange={handleChangePeopleNumber}
            valueLabelDisplay="auto"
            getAriaValueText={getValue}
            disableSwap
            style={{ width: 170 }}
            defaultValue={[2, 20]}
            max={50}
            min={0}
          />
          <Typography
            id="input-slider"
            gutterBottom
            style={{ textAlign: "center"}}
          >
            {valueNumPeople[0] + " - " + valueNumPeople[1]}
          </Typography>
              </>
          }
        </Grid>
        <Grid item xs>
          { type != offerType.ADVENTURE && 
            <>
                <Typography
            id="input-slider"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            Price €
          </Typography>
          <Slider
            getAriaLabel={() => "Minimum distance shift"}
            value={valuePrice}
            onChange={handleChangePrice}
            valueLabelDisplay="auto"
            getAriaValueText={getValue}
            disableSwap
            style={{ width: 170 }}
            defaultValue={[20, 50]}
            max={300}
            min={0}
          />
          <Typography
            id="input-slider"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            {valuePrice[0] + " - " + valuePrice[1]}
          </Typography>
            </>
          }
        </Grid>
        <Grid item xs>
          <Button size="large" sx={{}} onClick={() => sendParams()}>
            Filter
          </Button>
          <Button size="large" sx={{}} onClick={() => handleReset()}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
