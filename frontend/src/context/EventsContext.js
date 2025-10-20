// src/context/EventsContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetchEvents } from "../api/EventsApi"; // Ensure this function fetches all events

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load events from the backend
  const loadEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await fetchEvents();
      console.log("Fetched events:", fetchedEvents); // Log fetched events for debugging
  
      // Directly set the fetched events array
      setEvents(fetchedEvents);
      setError(null);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    loadEvents();
  }, []);

 // Function to increment RSVP count locally
  const incrementRSVPCount = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, rsvpCount: (event.rsvpCount || 0) + 1 }
          : event
      )
    );
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
        error,
        loadEvents, // To allow manual refresh
        incrementRSVPCount, // To update RSVP count locally
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
