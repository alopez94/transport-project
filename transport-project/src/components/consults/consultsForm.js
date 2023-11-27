import React, { useState } from "react";

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

  const handleLoadData = (e) => {
    const { name, value } = e.target || e;
    setConsultData({ ...consultData, [name]: value });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Container >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                
                  <TextField
                    name="departure"
                    type="text"
                    id="autocomplete1"
                    className="autocomplete-input"
                    label="Lugar de partida"
                    variant="outlined"
                    onChange={handleLoadData}
                  />
                  <TextField
                    name="destination"
                    label="Destino"
                    variant="outlined"
                    onChange={handleLoadData}
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
