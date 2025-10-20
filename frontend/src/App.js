// src/App.js
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Organizations from "./pages/Organizations"; // Page with all the Organizations
import OrganizationPage from "./pages/OrganizationPage"; // Single organization page
import DatePage from "./pages/Datepage"; // Renamed import
import EventDetails from "./pages/EventDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { EventsProvider } from "./context/EventsContext"; // Import EventsProvider
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEvent from "./pages/CreateEvent";
import RSVP from "./pages/RSVP";
import MyCalendar from "./pages/MyCalendar";
import "./App.css"; // Import your global CSS
import axios from "axios";
import Eventbrite from "./pages/Eventbrite";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1316617253533257769/m6wjsoTbgw8PfOc6FkeGfKRRcJEMMbr1YpGICO1-_yRZIsGBTefHFs6RshuJ9wRj4mT5";

function App() {
  const fetchEventsForToday = async () => {
    try {
      const response = await fetch("http://localhost:8001/");
      const data = await response.json();
      const events = data.events;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const todaysEvents = events.filter((event) => {
        const eventDate = new Date(event.date); // Assuming `event.date` is in ISO format
        return eventDate.toDateString() === today.toDateString();
      });

      return todaysEvents;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  };

  const sendDiscordNotification = async () => {
    const todaysEvents = await fetchEventsForToday();

    if (todaysEvents.length > 0) {
      const messageContent = todaysEvents
        .map(
          (event) =>
            `Event: ${event.name}, Time: ${event.time}, Location: ${event.location}`
        )
        .join("\n");

      const message = {
        content: `Daily Reminder: Check out today's events:\n${messageContent}`,
      };

      try {
        await axios.post(DISCORD_WEBHOOK_URL, message);
        console.log("Notification sent to Discord!");
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    } else {
      console.log("No events for today.");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const targetHour = 9;
      const targetMinute = 0;

      if (now.getHours() === targetHour && now.getMinutes() === targetMinute) {
        sendDiscordNotification();
      }
    }, 60000);
    sendDiscordNotification();
    return () => clearInterval(intervalId);
  }, []);

  console.log("Rendering App with routes...");
  return (
    // Wrap the entire application with AuthProvider and EventsProvider
    <AuthProvider>
      <EventsProvider>
        <div>
          {/* Navbar remains outside of Routes to persist across all pages */}
          <Navbar />

          {/* Define your application routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/organizations" element={<Organizations />} />

            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <MyCalendar />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div>My Profile</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/organization/:organizationID"
              element={<OrganizationPage />}
            />
            <Route path="/date/:date" element={<DatePage />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/event/create" element={<CreateEvent />} />
            <Route path="/event/:id/rsvp" element={<RSVP />} />
            <Route path="/eventbrite" element={<Eventbrite />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </EventsProvider>
    </AuthProvider>
  );
}

export default App;
