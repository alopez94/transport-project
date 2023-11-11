import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const days = [
    { name: 'Lunes', value: 1 },
    { name: 'Martes', value: 2 },
    { name: 'Miércoles', value: 3 },
    { name: 'Jueves', value: 4 },
    { name: 'Viernes', value: 5 },
    { name: 'Sábado', value: 6 },
    { name: 'Domingo', value: 7 },
  ];

const TransportUnitForm = ({ existingVehicle, onSave }) => {
  const [vehicle, setVehicle] = useState({
    brand: '',
    type: '',
    info: '',
    maxweight: 0,
    maxspeed: '',
    transmission: '',
    rentpricebase: 0,
    driverrequired: '',
    isAvailable: 0,
    daysAvailable: [] // Assuming this is an array of strings representing days
  });

  useEffect(() => {
    if (existingVehicle) {
      setVehicle(existingVehicle);
    }
  }, [existingVehicle]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setVehicle({ ...vehicle, [name]: checked }); // Use boolean for checkbox
    } else {
      setVehicle({ ...vehicle, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(vehicle);
  };

   const handleCheckboxChange = (value) => {
    setVehicle(prevVehicle => {
      const daysAvailable = prevVehicle.daysAvailable.includes(value)
        ? prevVehicle.daysAvailable.filter(day => day !== value) // Remove the day
        : [...prevVehicle.daysAvailable, value]; // Add the day

      return { ...prevVehicle, daysAvailable };
    });
  };

  const isEditing = Boolean(existingVehicle);

  return (
    
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        {isEditing && (
        <Typography variant="h6" color="primary" gutterBottom>
          Editando Vehículo: {existingVehicle?.brand}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="brand" label="Marca" value={vehicle.brand} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="type" label="Tipo" value={vehicle.type} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="info" label="Información" value={vehicle.info} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth type="number" name="maxweight" label="Peso Máximo" value={vehicle.maxweight} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="maxspeed" label="Velocidad Máxima" value={vehicle.maxspeed} onChange={handleChange} />
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
          <TextField required fullWidth type="number" name="rentpricebase" label="Precio Base de Alquiler" value={vehicle.rentpricebase} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="driverrequired" label="Conductor Requerido" value={vehicle.driverrequired} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={vehicle.isAvailable}
                onChange={(e) => setVehicle({ ...vehicle, isAvailable: e.target.checked  })}
              />
            }
            label="Disponible"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Días Disponibles
          </Typography>
          <FormGroup row>
            {days.map((day) => (
              <FormControlLabel
                key={day.value}
                control={
                  <Checkbox
                    checked={vehicle.daysAvailable.includes(day.value)}
                    onChange={() => handleCheckboxChange(day.value)}
                  />
                }
                label={day.name}
              />
            ))}
          </FormGroup>
        </Grid>
        {/* Add Grid item for FormGroup if needed */}
        <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {isEditing ? 'Actualizar' : 'Guardar'}</Button>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default TransportUnitForm;