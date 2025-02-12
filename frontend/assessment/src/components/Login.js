import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import GuestLogin from './GuestLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Ensure persistence before signing in
      await setPersistence(auth, browserLocalPersistence);

      await signInWithEmailAndPassword(auth, email, password);
      
      navigate('/event-Dashboard'); // Redirect after successful login
    } catch (error) {
      setError(error.message); // Show error to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
      <p>
        <GuestLogin />
      </p>
    </div>
    
  );
};

export default Login;
