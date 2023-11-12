import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { projectFirestore } from '../../firebase/config';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { addVehicle, updateVehicle, deleteVehicle } from '../../firebase/vehicles';
import TransportUnitForm from '../../components/transport/transportUnitForm';
import TransportUnitList from '../../components/transport/transportUnitList';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Admin() {
  const initialVehicleState = {
    brand: '',
    type: '',
    info: '',
    maxweight: 0,
    maxspeed: '',
    transmission: '',
    rentpricebase: 0,
    driverrequired: '',
    isAvailable: false,
    daysAvailable: []
  };
  
  const [value, setValue] = useState(0);
  const [vehicles, setVehicles] = useState([]); // This should hold the list of vehicles
  const [vehicle, setVehicle] = useState(initialVehicleState); // This should be an object
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setVehicle(initialVehicleState); 
    setIsEditing(false);             
    setEditingVehicle(null);         
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = projectFirestore.collection('vehicles').onSnapshot(snapshot => {
      const vehiclesArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVehicles(vehiclesArray); // This should be setVehicles, not setVehicle
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const resetEditing = () => {
    setEditingVehicle(null);
    setIsEditing(false); // Reset the editing state when the form is submitted or cancelled
  };

  const handleSaveVehicle = async (vehicleToSave) => {
    try {
      if (isEditing) {
        await updateVehicle(editingVehicle.id, vehicleToSave);
      } else {
        await addVehicle(vehicleToSave);
      }
      resetForm(); // Reset form after save
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
  

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Transportistas" {...a11yProps(0)} />
          <Tab label="Unidades" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* Content for Transportistas */}
        Transportistas
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* CRUD components for Unidades */}
        <TransportUnitForm existingVehicle={editingVehicle} vehicle={vehicle} setVehicle={setVehicle} onSave={handleSaveVehicle} isEditing={isEditing} />
        <TransportUnitList vehicles={vehicles} onEdit={handleEditVehicle} onDelete={handleDeleteVehicle} />
      </CustomTabPanel>
    </Box>
  );
}
