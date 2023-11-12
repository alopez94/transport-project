import { projectFirestore } from './config';

const driverCollection = projectFirestore.collection('drivers');

// Add a new driver
export const addDriver = async (driver) => {
  return await driverCollection.add(driver);
};

// Get all driver
export const getdrivers = async () => {
  const snapshot = await driverCollection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update a driver
export const updateDriver = async (id, driver) => {
  return await driverCollection.doc(id).update(driver);
};

// Delete a driver
export const deleteDriver = async (id) => {
  return await driverCollection.doc(id).delete();
};
