import React, { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

//styles
import "./Dashboard.css";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CardVehicules } from "../../components/cardVehicules";


export default function Dashboard() {
  const [value, setValue] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [vehicles, setVehicles] = useState([]);

  const useFirestoreCollection = (collectionName, setData) => {
    useEffect(() => {
      const unsubscribe = projectFirestore
        .collection(collectionName)
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setError(data.error);
          setData(data);

          if (data) {
            setLoading(false);
          }
        });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, [collectionName, setData]);
  };

  useFirestoreCollection("vehicles", setVehicles);
  
  //brand, info, maxweight, rentbaseprice, type, image

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Container className="containersection">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options=""
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Lugar de partida" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options=""
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Destino" />
                    )}
                  />
                  <DatePicker
                    label="Fecha de Inicio"
                    onChange={(newValue) => setValue(newValue)}
                  />
                  <DatePicker
                    label="Fecha de Finalizacion"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Container>
          </Grid>
          
          <Container>  
            <Grid className="cardsContainer">
              {loading && <div>Loading</div>}
              {error && <div>error.message</div>}
              {vehicles.map((vehicles) => (
                
                  <CardVehicules
                    className="card"
                    key={vehicles.id}
                    brand={vehicles.brand}
                    info={vehicles.info}
                    maxweight={vehicles.maxweight}
                    rentbaseprice={vehicles.rentbaseprice}
                    type={vehicles.type}
                  />
               
              ))}
            </Grid>
            </Container>
        </Grid>
      </Box>
    </div>
  );
}
