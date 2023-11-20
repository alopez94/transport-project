import { projectFirestore } from './config';

const vehicleCollection = projectFirestore.collection('vehicles');

// Add a new vehicle
export const addVehicle = async (vehicle) => {

  return await vehicleCollection.add(vehicle);
  
  
};

// Get all vehicles
export const getVehicles = async () => {
  const snapshot = await vehicleCollection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update a vehicle
export const updateVehicle = async (id, vehicle) => {
  return await vehicleCollection.doc(id).update(vehicle);
};

// Delete a vehicle
export const deleteVehicle = async (id) => {
  return await vehicleCollection.doc(id).delete();
};
