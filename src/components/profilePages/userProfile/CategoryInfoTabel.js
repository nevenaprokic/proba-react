import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { userType } from '../../../app/Enum';
import { getAllClientCategories, getAllOwnerCategories } from '../../../services/LoyaltyService';
import { useEffect, useState } from "react";
 



export default function CategoryInfoTabel({categoryType, userCategory}) {

    const [categories, setCategories] = useState();

    const categoriesFunction ={
        [userType.CLIENT] : getAllClientCategories,
        [userType.OWNER] : getAllOwnerCategories
    }

    useEffect(() => {
        async function setData() {
            const categoriesData = await categoriesFunction[categoryType]();
            setCategories(categoriesData ? categoriesData.data : {});
          }
          setData();
    }, [])

  return (
      !!categories &&
    <TableContainer component={Paper} sx={{width: "50%", marginLeft:"25%", marginTop:"10%"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell sx={{color:"#CC7351"}}>Category name</TableCell>
            <TableCell align="right" sx={{color:"#CC7351"}}>Points for successfull reservation</TableCell>
            <TableCell align="right" sx={{color:"#CC7351"}}>Lower limit</TableCell>
            <TableCell align="right" sx={{color:"#CC7351"}}>Upper limit</TableCell>
            <TableCell align="right" sx={{color:"#CC7351"}}>{categoryType == userType.CLIENT ? "Discount for reservation (%)" : "Earnings from reservation (%)"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0} }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.reservationPoints}</TableCell>
              <TableCell align="right">{row.lowLimitPoints}</TableCell>
              <TableCell align="right">{row.heighLimitPoints}</TableCell>
              <TableCell align="right">{categoryType == userType.CLIENT ? row.discount : row.earningsPercent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}