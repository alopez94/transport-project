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

const DriverUnitForm = ({ existingDriver, onSave }) => {
  const [driver, setDriver] = useState({
    name: '',
    lastname: '',
    dni: '',
    email: '',
    cellphone: '',
    address: '',
    age: 0,
    isactive: true,
  });

  useEffect(() => {
    if (existingDriver) {
        setDriver(existingDriver);
    }
  }, [existingDriver]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
        setDriver({ ...driver, [name]: checked }); // Use boolean for checkbox
    } else {
        setDriver({ ...driver, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(driver);
  };

  const isEditing = Boolean(existingDriver);

  return (
    
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        {isEditing && (
        <Typography variant="h6" color="primary" gutterBottom>
          Editando Transportista: {existingDriver?.name} {existingDriver?.lastname}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="name" label="Nombre" value={driver.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="lastname" label="Apellido" value={driver.lastname} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="dni" label="No. Identidad" value={driver.dni} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="email" label="Correo Electronico" value={driver.email} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="cellphone" label="Telefono" value={driver.cellphone} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField required fullWidth name="address" label="Direccion" value={driver.address} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
</Grid>
        {/* <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={driver.isactive}
                onChange={(e) => setDriver({ ...driver, isactive: e.target.checked  })}
              />
            }
            label="Activo"
          />
        </Grid> */}
        {/* Add Grid item for FormGroup if needed */}
        <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {isEditing ? 'Actualizar' : 'Guardar'}</Button>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default DriverUnitForm;