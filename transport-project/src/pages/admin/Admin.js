import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DriverUnitForm from '../../components/drivers/DriverUnitForm';
import DriverUnitList from '../../components/drivers/DriverUnitList';
import { addDriver,updateDriver, deleteDriver} from '../../firebase/Drivers';
import { projectFirestore } from '../../firebase/config';

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
          <Typography>{children}</Typography>
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

  const initialDriverState = {
    name: '',
    lastname: '',
    dni: '',
    email: '',
    cellphone: '',
    address: '',
    age: 0,
    isactive: true,
  };
  
  const [value, setValue] = React.useState(0);
  const [drivers, setDrivers] = useState([]); // This should hold the list of drivers
  const [driver, setDriver] = useState(initialDriverState); // This should be an object
  const [editingdriver, setEditingDriver] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const resetForm = () => {
    setDriver(initialDriverState); 
    setIsEditing(false);             
    setEditingDriver(null);         
  };

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = projectFirestore.collection('drivers').onSnapshot(snapshot => {
      const driversArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDrivers(driversArray); // This should be setDrivers, not setDriver
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const resetEditing = () => {
    setEditingDriver(null);
    setIsEditing(false); // Reset the editing state when the form is submitted or cancelled
  };

  const handleSaveDrive = async (driverToSave) => {
    try {
      if (isEditing) {
        await updateDriver(editingdriver.id, driverToSave);
        console.log(editingdriver.id)
      } else {
        await addDriver(driverToSave);
      }
      console.log(driverToSave)
      resetForm()// Reset form after save
    } catch (error) {
      console.error("Error saving document: ", error);
      // Handle the error accordingly
    }
  };

  const handleEditDriver  = (driver) => {
    setEditingDriver (driver);
    setIsEditing(true); // Set isEditing to true when editing
  };

  const handleDeleteDriver = async (id) => {
    await updateDriver(id, { isactive: false });
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
        {/* CRUD components for Unidades */}
      <DriverUnitForm 
        existingDriver={editingdriver}
        driver={driver}
        setDriver={setDriver}
        onSave={handleSaveDrive}
        isEditing={isEditing}
      />
      <DriverUnitList
        drivers={drivers}
        onEdit={handleEditDriver}
        onDelete={handleDeleteDriver}
      />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       Unidades
      </CustomTabPanel>
      
    </Box>
  );
}
