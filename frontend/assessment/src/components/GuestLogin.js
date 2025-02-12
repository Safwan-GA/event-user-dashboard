// src/components/GuestLogin.js
import React from 'react';
import { auth } from '../firebase';
import {sendUserDataToBackend} from './Register'
import { signInAnonymously, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const GuestLogin = () => {
  const navigate = useNavigate();
  const handleGuestLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInAnonymously(auth); 
      await sendUserDataToBackend(userCredential.user.uid,"Anonymous user : "+ userCredential.user.uid);
      navigate('/event-Dashboard'); 

      console.log("Guest signed in:", userCredential.user);
    } catch (error) {
      console.error("Error signing in as guest:", error);
    }
  }

  return (
    <button onClick={handleGuestLogin}>Login as Guest</button>
  );
};

export default GuestLogin;