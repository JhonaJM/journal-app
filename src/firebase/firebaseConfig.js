//import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD59aCKI73J0qFzrBNz5-3C1MWplsSE6y4",
    authDomain: "journalappreactredux.firebaseapp.com",
    projectId: "journalappreactredux",
    storageBucket: "journalappreactredux.appspot.com",
    messagingSenderId: "562691396507",
    appId: "1:562691396507:web:b8faa903a6b347c771473e"
  };
// Your web app's Firebase configuration

    
   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
    
   const db = getFirestore();
    
   const googleAuthProvider = new GoogleAuthProvider();
    
 
  
  // Initialize Firebase
  //const app = initializeApp(firebaseConfig)
  export{
    db,
    googleAuthProvider
}


