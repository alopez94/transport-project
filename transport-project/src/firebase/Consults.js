import { projectFirestore } from "./config";

const consultsCollection = projectFirestore.collection('consults');

export const addConsult = async(consult) => {
    return await consultsCollection.add(consult);
}