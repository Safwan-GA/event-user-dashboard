
import { initializeApp } from "firebase/app";
import { getAuth , setPersistence, browserLocalPersistence } from "firebase/auth";

//  Firebase Configuration
const firebaseConfig = {
  apiKey: "_",
  authDomain: "_",
  projectId: "_",
  storageBucket: "",
  messagingSenderId: "_",
  appId: "_",
  measurementId: "_"
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

/**
 *  Fetches the current user's Firebase authentication token.
 * @returns {Promise<string|null>} The Firebase ID token, or null if no user is signed in.
 */
export const getFirebaseToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(); //  Get fresh Firebase token
  } else {
    console.warn("No authenticated user found.");
    return null;
  }
};

export { app, auth };


