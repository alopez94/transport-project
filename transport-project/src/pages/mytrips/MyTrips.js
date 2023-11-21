import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';

import './MyTrips.css'
import Container from '@mui/material/Container';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import LoadsUnitList from '../../components/loads/loadsUnitList';
import { addLoad } from '../../firebase/Loads';



export default function MyTrips() {
  
  const initialLoadsState = {
    createdby: '',
    startDate: '',
    endDate: '',
    departure: '',
    destination: '',
    vehicle: '',
    status: ''
  }

  //states
  const [value, setValue] = useState(0);
  const [loads, setLoads] = useState([])
  const [load, setLoad] = useState()
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const useFirestoreCollection = (collectionName, setData) => {
    useEffect(() => {
      const unsubscribe = projectFirestore.collection(collectionName).onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(data);
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, [collectionName, setData]);
  };
  
  useFirestoreCollection('loads',setLoads)

  const handleSaveLoad = async (loadToSave) => {
    try {
      const docRef = await addLoad(loadToSave);
    }
    catch(err) {
      console.error("No se pudo guardar doc", err)
    }
  }


  
  return (
    <div>

      <Container fixed>
      <Typography variant="h6" color="primary" gutterBottom>
                <p>Tus viajes!</p>
                Aqui puedes ver los viajes que has solicitado
              </Typography>
        <Box sx={{ height: '100vh' }}>
          <LoadsUnitList loads={loads}  />
        </Box>
      </Container>

    </div>
  )
}
