import React, { useEffect, useState } from 'react'

//mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAuthContext } from '../../hooks/useAuthContext';
import { projectStorage } from '../../firebase/config';

export default function CardStruct({image,brand,info,maxweight,type,rentpricebase}) {
  
  const {user} = useAuthContext()
  const imageRef = projectStorage.ref(`transportUnit/${image}`);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Get the download URL for the image
    imageRef.getDownloadURL()
      .then(url => {
        setImageUrl(url);
      })
      .catch(error => {
        console.error('Error getting download URL:', error);
      });
  }, [imageRef]);

  return (
    <div>
         <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt=""
              height="140"
              image={imageUrl}
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
