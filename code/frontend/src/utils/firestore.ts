import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBdcD9jSwV2VPYJB5SVXdA8CLrll7ZWST4",
  authDomain: "noomedia1-124f4.firebaseapp.com",
  projectId: "noomedia1-124f4",
  storageBucket: "noomedia1-124f4.appspot.com",
  messagingSenderId: "1011978566199",
  appId: "1:1011978566199:web:9cb8cd71cd566cfa731db2"
};

// Initialisierung
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Exporte
export { firebaseApp, firebaseAuth, db };