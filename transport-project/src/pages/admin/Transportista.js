import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
import { addDriver,updateDriver, deleteDriver} from '../../firebase/Drivers';
import DriverUnitForm from '../../components/drivers/DriverUnitForm';
import DriverUnitList from '../../components/drivers/DriverUnitList';

export default function  Transportista(){

    const initialDriverState = {
        name: '',
        lastname: '',
        dni: '',
        email: '',
        cellphone: '',
        address: '',
        age: 0,
        isactive: false,
      };
      
      const [drivers, setDrivers] = useState([]); // This should hold the list of drivers
      const [driver, setDriver] = useState(initialDriverState); // This should be an object
      const [editingdriver, setEditingDriver] = useState(null);
      const [isEditing, setIsEditing] = useState(false);

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
          } else {
            await addDriver(driverToSave);
          }
          resetForm(); // Reset form after save
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
        await deleteDriver(id);
      };

      const driverUnitForm = (
        <DriverUnitForm
          existingDriver={editingdriver}
          driver={driver}
          setDriver={setDriver}
          onSave={handleSaveDrive}
          isEditing={isEditing}
        />
      );

      const driversUnitList = (
        <DriverUnitList
          drivers={drivers}
          onEdit={handleEditDriver}
          onDelete={handleDeleteDriver}
        />
      );
    
}