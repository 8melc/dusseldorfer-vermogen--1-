import { firebaseApp } from "app"; // Import the Databutton-provided firebaseApp
import { getFirestore } from "firebase/firestore";

// Initialize Firestore with the Databutton-provided firebaseApp
const db = getFirestore(firebaseApp);

// Export the Firestore instance for use in other parts of the app
export { db };

// For Firebase Authentication, directly import firebaseAuth from "app" where needed:
// import { firebaseAuth } from "app";

// For the Firebase App instance, directly import firebaseApp from "app" where needed:
// import { firebaseApp } from "app";
