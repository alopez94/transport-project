import React, { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";
import Script from "react-load-script";

//styles
import "./Dashboard.css";
import { Container, colors } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CardVehicules } from "../../components/cardVehicules";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Dashboard() {
  const [autocomplete, setAutocomplete] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [departure, setDeparture] = useState();
  const [arrival, setArrival] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [vehicles, setVehicles] = useState([]);

  const handleScriptLoad = () => {
    //test
    const varAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["(cities)"] }
    );
    varAutocomplete.addListener("place_changed", handlePlaceSelect);
    setAutocomplete(varAutocomplete);
    console.log("Script loaded, initializing autocomplete...");
    console.log("autocomplete :>> ", autocomplete);
  };

  const handlePlaceSelect = () => {
    const addressObject = autocomplete.getPlace();
    const address = addressObject.address_components;
    if (address) {
      // Handle the selected place details
      console.log(address);
    }
  };

  const loadModalData = () => {};

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

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Container className="containersection">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <Script
                    url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDLtGQQEO4Meam3ns19cuf_DA4yl9gwaps&libraries=places`}
                    onLoad={handleScriptLoad}
                  />

                  <TextField
                    id="locationstart"
                    label="Lugar de partida"
                    variant="outlined"
                    value={departure}
                  />
                  <TextField
                    id="locationEnd"
                    label="Destino"
                    variant="outlined"
                    value={arrival}
                  />

                  <DatePicker
                    label="Fecha de Inicio"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    disablePast
                  />
                  <DatePicker
                    label="Fecha de Finalizacion"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    minDate={startDate}
                  />

                  <Button variant="contained">Buscar</Button>
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
                  image={vehicles.image}
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
