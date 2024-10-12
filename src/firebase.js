// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';  // If you're using storage

const firebaseConfig = {
    apiKey: "AIzaSyA-NfRboFvzzyeGODXW4-Sc6KGJqT7QdyY",
  authDomain: "kingsleyandnadia-8038c.firebaseapp.com",
  projectId: "kingsleyandnadia-8038c",
  storageBucket: "kingsleyandnadia-8038c.appspot.com",
  messagingSenderId: "270042982024",
  appId: "1:270042982024:web:f8dba39892efca656e613d",
  measurementId: "G-YMRKGVHXRZ"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);  // If you're using Firebase Storage

export {  storage };
