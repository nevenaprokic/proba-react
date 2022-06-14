import MediaCard from "../layout/MediaCard";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { getCottageByCottageOwnerEmail } from "../../services/CottageService";
import { useState, useEffect } from "react";
import {
  getUsernameFromToken,
  getRoleFromToken,
} from "../../app/jwtTokenUtils";
import { userType, offerTypeByUserType } from "../../app/Enum";
import { getAdventureByInstructorEmail } from "../../services/AdventureService";
import { getShipByShipOwnerEmail } from "../../services/ShipService";

export default function Album({ albumData, setAlbumeData }) {
  let role = getRoleFromToken();
  let getOfferByOwnerEmail = {
    [userType.COTTAGE_OWNER]: getCottageByCottageOwnerEmail,
    [userType.INSTRUCTOR]: getAdventureByInstructorEmail,
    [userType.SHIP_OWNER]: getShipByShipOwnerEmail,
  };

  useEffect(() => {
    async function getOfferData() {
      let username = getUsernameFromToken();
      const offersData = await getOfferByOwnerEmail[role](username);
      setAlbumeData(!!offersData ? offersData.data : {});

      return offersData;
    }
    getOfferData();
  }, []);

  if (!!albumData) {
    return (
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {albumData.map((offer) => (
            <Grid item key={offer.id} xs={12} sm={6} md={4}>
              <MediaCard
                offer={offer}
                offerT={offerTypeByUserType[getRoleFromToken()]}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else return null;
}
