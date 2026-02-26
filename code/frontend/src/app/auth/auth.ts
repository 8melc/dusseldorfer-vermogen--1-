import {
  type AuthCredential,
  GoogleAuthProvider,
  type User,
  type UserCredential,
  type UserInfo,
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signOut as firebaseSignOut,
  reauthenticateWithCredential,
  signInWithPopup,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "./firebase";

const validateConfig = () => {
  if (firebaseAuth) {
    console.log("Firebase auth extension enabled");
  } else {
    console.warn("Firebase auth not configured, running in demo mode");
  }
};

const signInWithGoogle = async (): Promise<UserCredential | null> => {
  if (!firebaseAuth) { console.warn("Firebase auth not available"); return null; }
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
  return signInWithPopup(firebaseAuth, provider);
};

const signOut = async (): Promise<void> => {
  if (!firebaseAuth) return;
  return firebaseSignOut(firebaseAuth);
};

const getCurrentUser = (): User | null => {
  return firebaseAuth?.currentUser ?? null;
};

const updateCurrentUser = async (
  user: User,
  payload: Partial<Pick<UserInfo, "displayName" | "photoURL">>,
) => {
  return updateProfile(user, payload);
};

const updateCurrentUserEmail = async (user: User, email: string) => {
  return updateEmail(user, email);
};

const sendEmailVerification = async (user: User) => {
  return firebaseSendEmailVerification(user);
};

const updateCurrentUserPassword = async (user: User, newPassword: string) => {
  return updatePassword(user, newPassword);
};

const sendPasswordResetEmail = async (email: string) => {
  if (!firebaseAuth) { console.warn("Firebase auth not available"); return; }
  return firebaseSendPasswordResetEmail(firebaseAuth, email);
};

const reauthenticateUser = async (user: User, credential: AuthCredential) => {
  return reauthenticateWithCredential(user, credential);
};

const getAuthToken = async (): Promise<string | null> => {
  return firebaseAuth?.currentUser?.getIdToken() ?? null;
};

const getAuthHeaderValue = async (): Promise<string> => {
  const idToken = await getAuthToken();
  return `Bearer ${idToken ?? ""}`;
};

export const auth = {
  getAuthHeaderValue,
  getAuthToken,
  getCurrentUser,
  reauthenticateUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithGoogle,
  signOut,
  updateCurrentUser,
  updateCurrentUserEmail,
  updateCurrentUserPassword,
  validateConfig,
};
