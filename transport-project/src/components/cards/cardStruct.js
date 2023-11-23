import React from 'react'

//mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function CardStruct({image,brand,info,maxweight,type,rentpricebase}) {
  return (
    <div>
         <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt=""
              height="140"
              image={image}
            />
            <CardContent>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="div">
                  {brand}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {info}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component={"span"} variant={"body2"}>
                  Peso Maximo: {maxweight}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component={"span"} variant={"body2"}>
                  Typo de Vehiculo: {type}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component={"span"} variant={"body2"}>
                  {" "}
                  Precio de Renta Diario: L.{rentpricebase}
                </Typography>
              </Grid>
            </CardContent>
            
          </Card>
    </div>
  )
}
