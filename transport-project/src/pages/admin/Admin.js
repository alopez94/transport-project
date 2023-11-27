import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { projectFirestore } from "../../firebase/config";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import {
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../firebase/vehicles";

import { useCollection } from "../../hooks/useCollection";
import TransportUnitForm from "../../components/transport/transportUnitForm";
import TransportUnitList from "../../components/transport/transportUnitList";
import DriverUnitForm from "../../components/drivers/DriverUnitForm";
import DriverUnitList from "../../components/drivers/DriverUnitList";
import { addDriver, updateDriver, deleteDriver } from "../../firebase/Drivers";




function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Admin() {
  const initialVehicleState = {
    createdby: "",
    isActive: true,
    brand: "",
    type: "",
    info: "",
    maxweight: 0,
    maxspeed: "",
    transmission: "",
    rentpricebase: 0,
    driverrequired: "",
    image: "",
    isAvailable: false,
    startDateAvailable: "",
    endDateAvailable: "",
  };
  const initialDriverState = {
    name: "",
    lastname: "",
    dni: "",
    email: "",
    cellphone: "",
    address: "",
    age: 0,
    isactive: true,
  };
  // Use the custom hook for vehicles
    
  const { documents: vehicles, error: errorVehicle } = useCollection("vehicles");
const { documents: drivers, error: errorDriver } = useCollection("drivers");
  
  const [value, setValue] = useState(0);
  const [vehiclesList, setVehiclesList] = useState([]); // This should hold the list of vehicles
  const [vehicle, setVehicle] = useState(initialVehicleState); // This should be an object
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [driversList, setDriversList] = useState([]); // This should hold the list of drivers
  const [driver, setDriver] = useState(initialDriverState); // This should be an object
  const [editingdriver, setEditingDriver] = useState(null);
  const [vehicleDocID,setVehicleDocID] = useState()
  const [vehicleDocIdToTransporForm, setVehicleDocIdToTransporForm] = useState()
  //const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setVehiclesList(initialVehicleState);
    setIsEditing(false);
    setEditingVehicle(null);
    setDriver(initialDriverState);
    setEditingDriver(null);
  };

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const resetEditing = () => {
    setEditingVehicle(null);
    setEditingDriver(null);
    setIsEditing(false); // Reset the editing state when the form is submitted or cancelled
  };

 
    // #region Crud Vehiculos
  const handleSaveVehicle = async (vehicleToSave) => {
    try {
      
      if (isEditing) {
        await updateVehicle(editingVehicle.id, vehicleToSave);
      } else {
        
         // Capture the returned document reference
        const refdoc = await addVehicle(vehicleToSave);
        setVehicleDocIdToTransporForm(refdoc.id)
                
      }
      //resetForm(); // Reset form after save
    } catch (error) {
      console.error("Error saving document: ", error);
      // Handle the error accordingly
    }
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsEditing(true); // Set isEditing to true when editing
  };

  const handleDeleteVehicle = async (id) => {
    await deleteVehicle(id);
  };
  //  #endregion

  // #region Crud Drivers
  const handleSaveDrive = async (driverToSave) => {
    try {
      if (
        !driverToSave.name ||
        !driverToSave.lastname ||
        !driverToSave.dni ||
        !driverToSave.email ||
        !driverToSave.cellphone ||
        !driverToSave.address
      ) {
        throw new Error("Todos los campos deben ser completados.");
      }
      if (!/^\d{8}$/.test(driverToSave.cellphone)) {
        throw new Error("El número de teléfono debe contener 8 números.");
      }

      if (!/^\d{13}$/.test(driverToSave.dni)) {
        throw new Error("El número de identidad no es valido.");
      }

      // Validación de formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(driverToSave.email)) {
        throw new Error("El formato del correo electrónico no es válido.");
      }

      if (isEditing) {
        await updateDriver(editingdriver.id, driverToSave);
        console.log(editingdriver.id);
      } else {
        await addDriver(driverToSave);
      }
      console.log(driverToSave);
      resetForm(); // Reset form after save
    } catch (error) {
      console.error("Error saving document: ", error);
      window.alert(error.message);
      // Handle the error accordingly
    }
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setIsEditing(true); // Set isEditing to true when editing
  };

  const handleDeleteDriver = async (id) => {
    await updateDriver(id, { isactive: false });
  };
  // #endregion
  return (
    <Box  sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Transportistas" {...a11yProps(0)} />
          <Tab label="Unidades" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* CRUD components for Unidades */}
        <DriverUnitForm
          existingDriver={editingdriver}
          driver={driver}
          setDriver={setDriver}
          onSave={handleSaveDrive}
          isEditing={isEditing}
        />
       {drivers && <DriverUnitList
          drivers={drivers}
          onEdit={handleEditDriver}
          onDelete={handleDeleteDriver}
        />}
      </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        {/* CRUD components for Unidades */}
      {setVehicleDocIdToTransporForm && <TransportUnitForm 
          existingVehicle={editingVehicle}
          vehicle={vehicle}                      
          onSave={handleSaveVehicle}
          onImgURLconst={vehicleDocIdToTransporForm}
          isEditing={isEditing}
        />}
       {vehicles && <TransportUnitList
          vehicles={vehicles}
          onEdit={handleEditVehicle}
          onDelete={handleDeleteVehicle}
        />}
      </CustomTabPanel>
    </Box>
  );
}
