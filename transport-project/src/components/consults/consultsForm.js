import React, { useEffect, useRef, useState } from "react";

//mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Container, colors } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function ConsultsForm({ onSelect }) {
  const [consultData, setConsultData] = useState();
  const departureRef = useRef(null);
  const destinationRef = useRef(null);
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);

  const [selectedPlace, setSelectedPlace] = useState(null);

  const loadGoogleMapsScript = (callback) => {
    if (window.google) {
      callback();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLtGQQEO4Meam3ns19cuf_DA4yl9gwaps&libraries=places`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = callback;
  };

  const initAutocomplete = () => {
    if (!window.google) {
      console.error("Google Maps API not loaded yet.");
      return;
    }

    // Initialize Autocomplete for the departure input
    const departureAutocomplete = new window.google.maps.places.Autocomplete(
      departureRef.current,
      { types: ["(cities)"] }
    );
    departureAutocomplete.addListener("place_changed", () => {
      const place = departureAutocomplete.getPlace();
      
      setDeparture(place.name);
    });

    // Initialize Autocomplete for the destination input
    const destinationAutocomplete = new window.google.maps.places.Autocomplete(
      destinationRef.current,
      { types: ["(cities)"] }
    );
    destinationAutocomplete.addListener("place_changed", () => {
      const place = destinationAutocomplete.getPlace();
      
      setDestination(place.name);
     
    });
  };

  useEffect(() => {
    loadGoogleMapsScript(() => {
      initAutocomplete();
    });
  }, []);

  const handleLoadData = (e) => {
    const { name, value } = e.target || e;
    setConsultData({ ...consultData, [name]: value, departure: departure, destination: destination });
    console.log('consultData :>> ', consultData);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <TextField
                  name="departure"
                  type="text"
                  inputRef={departureRef}
                  id="input1"
                  label="Lugar de partida"
                  variant="outlined"
                  value={departure}
                  
                />
                <TextField
                  inputRef={destinationRef}
                  name="destination"
                  type="text"
                  id="dest"
                  className="autocomplete"
                  label="Destino"
                  variant="outlined"
                  value={destination}
                  onSubmit={handleLoadData}
                />

                <DatePicker
                  name="startDate"
                  label="Fecha de Inicio"
                  onChange={(newValue) => {
                    const formattedDate = newValue
                      ? newValue.toISOString().split("T")[0]
                      : "";
                    handleLoadData({
                      name: "startDate",
                      value: formattedDate,
                    });
                  }}
                  disablePast
                />
                <DatePicker
                  name="endDate"
                  label="Fecha de Finalizacion"
                  disablePast
                  onChange={(newValue) => {
                    const formattedDate = newValue
                      ? newValue.toISOString().split("T")[0]
                      : "";
                    handleLoadData({ name: "endDate", value: formattedDate });
                  }}
                />
                <TextField
                  select
                  required
                  fullWidth
                  name="driverrequired"
                  label="Conductor Requerido"
                  onChange={handleLoadData}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </TextField>

                <Button
                  variant="contained"
                  onClick={() => onSelect(consultData)}
                >
                  Buscar
                </Button>
              </DemoContainer>
            </LocalizationProvider>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
