import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom'; 
import EventDashboard from './components/EventDashboard';
import EventForm from './components/EventForm';
import UserList from './components/UserList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); //  Persist user on refresh
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Event Management System</h1>
      <Routes>
        <Route path="/event-Dashboard" element={user ? <EventDashboard /> : <Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/UserList" element={<UserList />} />
      </Routes>
    </div>
  );
};

export default App;
