import "./cardVehicule.css"

import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export function CardVehicules(brand, info, maxweight, rentbaseprice, type, image) {
  
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      alt="green iguana"
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
        {maxweight}
        {type}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Reserve</Button>
      <CardContent>
        {rentbaseprice}
      </CardContent>
    </CardActions>
  </Card>
  )
}
