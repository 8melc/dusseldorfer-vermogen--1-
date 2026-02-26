import { type FirebaseApp, initializeApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";
import { type FirebaseStorage, getStorage } from "firebase/storage";
import { config } from "./config";

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firestore: Firestore | null = null;
let firebaseDb: Firestore | null = null;
let firebaseStorage: FirebaseStorage | null = null;

if (config) {
  try {
    firebaseApp = initializeApp(config.firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
    firebaseDb = firestore;
    firebaseStorage = getStorage(firebaseApp);
  } catch (e) {
    console.warn("[Firebase] Initialization failed, running without Firebase:", e);
  }
} else {
  console.warn("[Firebase] No config found, running without Firebase auth.");
}

export { firebaseApp, firebaseAuth, firestore, firebaseDb, firebaseStorage };
