import "./cardVehicule.css"

import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export function CardVehicules({id,image, brand, info, maxweight, rentbaseprice, type}) {
  
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      alt=""
      height="140"
      image={image}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {brand}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {info}
      </Typography>
      <Typography variant="body2" color="text.secondary">
       <p className="details"> Peso Maximo: {maxweight}</p>
       <p className="details">Typo de Vehiculo:{type}</p>
       <p className="details"> Precio de Renta Diario: {rentbaseprice}</p>
        
        
      </Typography>
    </CardContent>      
    <CardActions>
      <Button size="small">Alquilar</Button>
     
    </CardActions>
  </Card>
  )
}
