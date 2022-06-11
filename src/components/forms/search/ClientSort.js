import React from 'react'
import Grid from '@mui/material/Grid';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import Button from "@mui/material/Button";
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {sortReservations} from '../../../services/ReservationService';


export default function ClientSort({ reservations, setReservations }) {

    const [sortAsc, setSortAsc] = useState(true);
    const [criteria, setCriteria] = useState(1);

    const criteriaChanged = event => {
        let value = event.target.value;
        setCriteria(value);
        sortReservations(value, sortAsc, reservations, setReservations);
    };

    const orderChanged = () => {
        sortReservations(criteria, !sortAsc, reservations, setReservations);
        setSortAsc(!sortAsc);
    };

  return (
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
              size='10'
              onChange={criteriaChanged}
            >
              <MenuItem value={1}>Date</MenuItem>
              <MenuItem value={2}>Price</MenuItem>
              <MenuItem value={3}>Duration</MenuItem>
             
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
  );
}
