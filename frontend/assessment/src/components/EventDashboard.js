import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; 

const EventDashboard = () => {
  const [events, setEvents] = useState([]); // Ensure events is an array
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  // const [createdBy, setCreatedBy]= useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const user = auth.currentUser; //  Fetch current user
      if (!user) {
        setError("Unauthorized: Please log in.");
        return;
      }

      try {
        const token = await user.getIdToken(); //  Get Firebase token dynamically
        const response = await fetch("/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Fetched events:", data); // Debugging

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch events");
        }

        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching events:", err.message);
        setError(err.message);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const eventCategory = event.category?.toLowerCase();
    const selectedCategory = category.toLowerCase();
  
    const eventDate = new Date(event.date).toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
    const selectedDate = date; // Already in "YYYY-MM-DD" format from input
    // const createdBy=event.createdBy;
  
    // Case 1: Only category selected
    if (category && !date) {
      return eventCategory === selectedCategory;
    }
  
    // Case 2: Only date selected
    if (!category && date) {

      return eventDate === selectedDate;
    }
  
    // Case 3: Both category and date selected
    if (category && date) {
      return eventCategory === selectedCategory && eventDate === selectedDate;
    }
  
    // Case 4: Neither selected (show all)
    return true;
  });
  
  

  return (
    <div>
      <h1>Event Dashboard</h1>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
        </select>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>email</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id || event.name} style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{event.name}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{event.description}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(event.date).toLocaleDateString()}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{event.createdBy}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{event.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventDashboard;
