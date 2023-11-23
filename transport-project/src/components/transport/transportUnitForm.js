import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  projectFirestore,
  projectStorage,
  projectAuthentication,
} from "../../firebase/config";
import "./transport.css";



const TransportUnitForm = ({
  existingVehicle,
  onSave,
  onReset,
  ImgURLconst,
  
}) => {
  const initialVehicleState = {
    createdBy: "",
    brand: "Toyota",
    type: "Test",
    info: "This is informacion",
    maxweight: 1,
    maxspeed: "80",
    transmission: "Manual",
    rentpricebase: 100,
    driverrequired: "Si",
    image: "",
    isAvailable: false,
    startDateAvailable: "",
    endDateAvailable: "",
  };

  const [vehicle, setVehicle] = useState(initialVehicleState);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  

  useEffect(() => {
   
    if (existingVehicle) {
      setVehicle(existingVehicle);
    }

  }, [existingVehicle]);

  

  const resetForm = () => {
    setVehicle(initialVehicleState);
  };

  const isFormValid = () => {
    
    return (
      vehicle.brand &&
      vehicle.type &&
      vehicle.transmission &&
      vehicle.driverrequired &&
      Number.isInteger(parseInt(vehicle.maxweight)) &&
      Number.isInteger(parseInt(vehicle.maxspeed)) &&
      Number.isInteger(parseInt(vehicle.rentpricebase)) 
      
    );
  };

  const handleChange = (eventOrCustomObject) => {
    const { name, value, checked, type } = eventOrCustomObject.target || eventOrCustomObject
    if (type === "checkbox") {
      setVehicle({ ...vehicle, [name]: checked });
    } 
    else {
      setVehicle({ ...vehicle, [name]: value });
      
    }

        
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('vehicle :>> ', vehicle);
    onSave(vehicle);    
    resetForm();
    saveImageStorage()
   
  };

  const saveImageStorage = async () => {

    const userID = await projectAuthentication.currentUser.uid;
    const uploadPath = `transportUnit/${userID}/${uploadImage.name}`;
    const img = await projectStorage.ref(uploadPath).put(uploadImage);
    const imgURL = await img.ref.getDownloadURL();
    
    console.log("vehicleSavedID in transport unit :>> ", ImgURLconst);
    
    if(ImgURLconst){
      await projectFirestore
      .collection("vehicles")
      .doc(ImgURLconst)
      .update({ image: imgURL });
    console.log("imgURL :>> ", imgURL);
  }
  };

  
  const isEditing = Boolean(existingVehicle);

  const [uploadImage, setUploadImage] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);

  const handleFileChange = (e) => {
    setUploadImage(null);
    let selected = e.target.files[0];

    if (!selected) {
      setUploadImageError("Asegurese de seleccionar una image");
      console.log("validacion 1 :>> ");
      return;
    }
    if (!selected.type.includes("image")) {
      setUploadImageError("El archivo seleccionado debe ser una imagen");
      console.log("validacion 2 :>> ");
      return;
    }
    if (selected.size > 1000000) {
      setUploadImageError("El archivo debe tener menos de 1 MB");
      console.log("validacion 3 :>> ");
      return;
    }
    setUploadImageError(null);
    setUploadImage(selected);

    console.log("Imagen guardada");
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      {isEditing && (
        <Typography variant="h6" color="primary" gutterBottom>
          Editando Vehículo: {existingVehicle?.brand}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            name="brand"
            label="Marca"
            value={vehicle.brand}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            name="type"
            label="Tipo"
            value={vehicle.type}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="info"
            label="Información"
            value={vehicle.info}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            type="number"
            inputProps={{ step: "1" }}
            name="maxweight"
            label="Peso Máximo (toneladas)"
            value={vehicle.maxweight}
            onChange={handleChange}
            placeholder="toneladas"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            name="maxspeed"
            label="Velocidad Máxima (km/h)"
            type="number"
            inputProps={{ min: "0", step: "5", max: "180" }}
            value={vehicle.maxspeed}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            fullWidth
            name="transmission"
            label="Transmisión"
            value={vehicle.transmission}
            onChange={handleChange}
          >
            <MenuItem value="Automatica">Automática</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            type="number"
            name="rentpricebase"
            label="Precio Base de Alquiler (Lempiras)"
            inputProps={{ min: "100", step: "1" }}
            value={vehicle.rentpricebase}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            fullWidth
            name="driverrequired"
            label="Necesita conductor"
            value={vehicle.driverrequired}
            onChange={handleChange}
          >
            <MenuItem value="Si">Si</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="file"
            label="Imagen"
            onChange={handleFileChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
          {uploadImageError && <div className="err">{uploadImageError}</div>}
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={vehicle.isAvailable}
                onChange={(e) =>
                  setVehicle({ ...vehicle, isAvailable: e.target.checked })
                }
              />
            }
            label="Disponible"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Fechas Disponibles
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
              name="startDate"
                label="Fecha de Inicio"
                value={startDate}
                onChange={(newValue) => {
                  const formattedDate = newValue ? newValue.toISOString().split('T')[0] : '';
                  handleChange({ name: 'startDateAvailable', value: formattedDate }, setStartDate(newValue));
                }}
                disablePast
                
              />
              <DatePicker
              name="endDate"
                label="Fecha de Finalizacion"
                value={endDate}
                disablePast
                minDate={startDate}
                onChange={(newValue) => {
                  const formattedDate = newValue ? newValue.toISOString().split('T')[0] : '';
                  handleChange({ name: 'endDateAvailable', value: formattedDate });
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        {/* Add Grid item for FormGroup if needed */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={!isFormValid()} // Button is disabled if form is not valid
          >
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransportUnitForm;
