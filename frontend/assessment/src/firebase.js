
import { initializeApp } from "firebase/app";
import { getAuth , setPersistence, browserLocalPersistence } from "firebase/auth";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGrCzCwG2OjVdeDewMTd1V5Rrww8Q3FYQ",
  authDomain: "ms20cs099.firebaseapp.com",
  projectId: "ms20cs099",
  storageBucket: "ms20cs099.firebasestorage.app",
  messagingSenderId: "306734213550",
  appId: "1:306734213550:web:ab324432954fc8b585c03f",
  measurementId: "G-V19BMQ4MRH"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

/**
 * ✅ Fetches the current user's Firebase authentication token.
 * @returns {Promise<string|null>} The Firebase ID token, or null if no user is signed in.
 */
export const getFirebaseToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(); // 🔥 Get fresh Firebase token
  } else {
    console.warn("No authenticated user found.");
    return null;
  }
};

export { app, auth };


