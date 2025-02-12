import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const sendUserDataToBackend = async (uid, email) => {
  try {
    await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, email }),
    });
  } catch (error) {
    console.error('Error sending user data to backend:', error);
  }
};

const Register = () => {
  const [email, setEmail] = useState('');
  // const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; //  Ensure user object is defined
      if (user) {
        await sendUserDataToBackend(user.uid, user.email); //  Send uid and email to backend
      }// Send email to backend
      navigate('/'); // Redirect after successful registration
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
// export sendUserDataToBackend;
