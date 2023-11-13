import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFHAdPknMKmNmSENk45TBGTBV5Sa0uEgc",
    authDomain: "transport-project-fe00e.firebaseapp.com",
    projectId: "transport-project-fe00e",
    storageBucket: "transport-project-fe00e.appspot.com",
    messagingSenderId: "548750400150",
    appId: "1:548750400150:web:d2bf9102e00c02a25980b7",
    measurementId: "G-LDCXDGGSN0"
  };

  //initialize firebase
  firebase.initializeApp(firebaseConfig)

  //
  const projectFirestore = firebase.firestore()
  const projectAuthentication = firebase.auth()
  

  //timestamp

  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuthentication, timestamp }