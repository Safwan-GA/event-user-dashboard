// src/components/EventForm.js
import React, { useState } from 'react';
import { auth } from '../firebase';

const EventForm = () => {


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const event = { name, description, date, category };
  
    const token = await auth.currentUser?.getIdToken(); // Get Firebase JWT
  
    const response = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Include JWT token
      },
      body: JSON.stringify(event),
    });
  
    if (response.ok) {
      setName('');
      setDescription('');
      setDate('');
      setCategory('');
    } else {
      console.error('Failed to create event', await response.json());

    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required></textarea>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Music">Music</option>
        <option value="Sports">Sports</option>
        <option value="Tech">Tech</option>
      </select>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;