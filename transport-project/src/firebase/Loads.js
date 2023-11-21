import { projectFirestore } from './config';

const loadsCollection = projectFirestore.collection('loads')

//add new load
export const addLoad = async (load) => {
    return await loadsCollection.add(load)
}

//get all loads
export const getCollections = async () => {
    const snapshot = await loadsCollection.get();
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

// Update a vehicle
export const updateLoads = async (id, load) => {
    return await loadsCollection.doc(id).update(load);
  };
  
  // Delete a vehicle
  export const deleteLoad = async (id) => {
    return await loadsCollection.doc(id).delete();
  };
  