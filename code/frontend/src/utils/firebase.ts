import { firebaseApp } from "app"; // Import the Databutton-provided firebaseApp
import { getFirestore, type Firestore } from "firebase/firestore";

// Initialize Firestore only if firebaseApp is available
let db: Firestore | null = null;
if (firebaseApp) {
  db = getFirestore(firebaseApp);
} else {
  console.warn("[Firebase Utils] No firebaseApp available, Firestore disabled.");
}

export { db };
