// src/pages/RSVP.js

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { submitRSVP } from "../api/RSVPApi";
import { fetchEvents } from "../api/EventsApi"; // Using the modified fetchEvents
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react"; // Importing icons
import { EventsContext } from "../context/EventsContext"; // Import context

const RSVP = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const { loadEvents, incrementRSVPCount } = useContext(EventsContext); // Access context functions
  const [eventDetails, setEventDetails] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch event details to display information on the RSVP page
  useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        const details = await fetchEvents(eventId);
        console.log("Fetched Event Details:", details); // Inspect the data structure
        setEventDetails(details);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setStatusMessage("Failed to load event details.");
      }
    };

    fetchEventInfo();
  }, [eventId]);

  const handleRSVP = async (e) => {
    e.preventDefault();
    const userInfo = { name, email };
    console.log("Submitting RSVP for event:", eventId, "with userInfo:", userInfo);

    try {
      await submitRSVP(eventId, userInfo);
      setStatusMessage("RSVP submitted successfully!");
      setName("");
      setEmail("");

      // Increment RSVP count locally
      incrementRSVPCount(eventId);

      // Optionally, re-fetch all events to ensure consistency
      await loadEvents();

      // After a short delay, navigate back to the event details page
      setTimeout(() => {
        navigate(`/event/${eventId}`);
      }, 2000);
    } catch (error) {
      console.error("RSVP submission error:", error);
      setStatusMessage("Failed to submit RSVP. Please try again.");
    }
  };

  if (!eventDetails && !statusMessage.includes("Failed")) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}>Loading event details...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Back Link */}
        <Link to={`/event/${eventId}`} style={styles.backLink}>
          <ArrowLeft size={20} style={{ marginRight: "8px" }} />
          Back to Event
        </Link>

        {/* Event Information */}
        {eventDetails && (

          <div style={styles.eventInfo}>

            {/* <h1 style={styles.title}>{eventDetails.name || "Event Title"}</h1>
            <p style={styles.description}>
              {eventDetails.description || "No description available."}
            </p> */}

            <div style={styles.metaInfo}>
              {/* Organization ID */}
              {eventDetails.organizationId && (
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>Organization ID:</span>
                  <span style={styles.metaValue}>{eventDetails.organizationId}</span>
                </div>
              )}

              {/* Date */}
              {eventDetails.date && (
                <div style={styles.metaItem}>
                  <Calendar style={styles.icon} />
                  <span style={styles.metaValue}>{formatDate(eventDetails.date)}</span>
                </div>
              )}

              {/* Time */}
              {eventDetails.time !== undefined && (
                <div style={styles.metaItem}>
                  <Clock style={styles.icon} />
                  <span style={styles.metaValue}>{formatTime(eventDetails.time)}</span>
                </div>
              )}

              {/* Location */}
              {eventDetails.location && (
                <div style={styles.metaItem}>
                  <MapPin style={styles.icon} />
                  <span style={styles.metaValue}>{eventDetails.location}</span>
                </div>
              )}

              {/* Category */}
              {eventDetails.category && (
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>Category:</span>
                  <span style={styles.metaValue}>{eventDetails.category}</span>
                </div>
              )}

              {/* RSVP Count
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>RSVP Count:</span>
                <span style={styles.metaValue}>{eventDetails.rsvpCount || 0}</span>
              </div> */}
              
            </div>
          </div>
        )}

        {/* RSVP Form */}
        <form onSubmit={handleRSVP} style={styles.form}>
          <h2 style={styles.formHeader}>RSVP to This Event</h2>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Name:
            </label>
            <input
              id="name"
              type="text"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Submit RSVP
          </button>
        </form>

        {/* Status Message */}
        {statusMessage && (
          <p
            style={{
              ...styles.statusMessage,
              color: statusMessage.includes("successfully") ? "green" : "red",
            }}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString) => {
  const dateObj = new Date(dateString + "T00:00:00");
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper function to format time from seconds to HH:MM AM/PM
const formatTime = (timeInSeconds) => {
  if (timeInSeconds === null || timeInSeconds === undefined) return "No time specified";
  const totalSeconds = timeInSeconds % 86400;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "700px",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "left",
    position: "relative",
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "600",
    marginBottom: "20px",
    transition: "color 0.3s",
  },
  eventInfo: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "15px",
    color: "#333333",
    fontWeight: "700",
  },
  description: {
    fontSize: "1rem",
    marginBottom: "25px",
    color: "#555555",
    lineHeight: "1.6",
  },
  metaInfo: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "30px",
    gap: "10px",
  },
  metaItem: {
    flex: "1 1 45%",
    fontSize: "1rem",
    color: "#333333",
    display: "flex",
    alignItems: "center",
  },
  metaLabel: {
    fontWeight: "600",
    marginRight: "8px",
    color: "#007bff",
  },
  metaValue: {
    color: "#000000",
  },
  icon: {
    marginRight: "8px",
    color: "#007bff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formHeader: {
    fontSize: "1.5rem",
    color: "#333333",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "600",
    color: "#333333",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "1rem",
    transition: "border-color 0.3s",
  },
  submitButton: {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  statusMessage: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "600",
  },
  spinner: {
    fontSize: "1.5rem",
    color: "#555555",
    textAlign: "center",
  },
};

export default RSVP;
