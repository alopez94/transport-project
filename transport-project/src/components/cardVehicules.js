import "./cardVehicule.css";

import React, { useState } from "react";

//mui

import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

//components
import CardStruct from "./cards/cardStruct";

export function CardVehicules({ vehicles, onSelect }) {
  return (
    <Grid container spacing={3}>
      {vehicles.map((vehicle) => (
        <Grid item xs={4} key={vehicle.id}>       
          <CardStruct 
          image={`${vehicle.image}`} 
          brand={vehicle.brand}
          info={vehicle.info}
          maxweight={vehicle.maxweight}
          type={vehicle.type}
          rentpricebase={vehicle.rentpricebase}
          />
            <CardActions>
              <Button onClick={() => onSelect(vehicle)} size="small">
                Seleccionar
              </Button>
            </CardActions>
          
        </Grid>
      ))}
    </Grid>
  );
}
