// src/pages/EventDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEventDetails } from "../api/CompositeApi";
import { Calendar, Clock, MapPin } from "lucide-react"; // Importing icons

const EventDetails = () => {
  const { id } = useParams(); // Retrieve the event ID from the URL parameters
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchEventDetails(id);
        setEventDetails(details);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getEventDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.card, ...styles.errorCard }}>
          <h2 style={styles.errorTitle}>Error</h2>
          <p style={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.card, ...styles.noDetailsCard }}>
          <h2 style={styles.noDetailsTitle}>No Details Found</h2>
          <Link to="/events" style={styles.backLink}>
            &larr; Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const { Event_INFO, RSVP_LIST } = eventDetails;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Event Header */}
        <h1 style={styles.title}>{Event_INFO?.name || "Event Title"}</h1>
        <p style={styles.description}>
          {Event_INFO?.description || "No description available."}
        </p>

        {/* Event Meta Information */}
        <div style={styles.metaInfo}>
          {/* Organization ID */}
          {Event_INFO?.organizationId && (
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Organization ID:</span>
              <span style={styles.metaValue}>{Event_INFO.organizationId}</span>
            </div>
          )}

          {/* Date */}
          {Event_INFO?.date && (
            <div style={styles.metaItem}>
              <Calendar style={styles.icon} />
              <span style={styles.metaValue}>{formatDate(Event_INFO.date)}</span>
            </div>
          )}

          {/* Time */}
          {Event_INFO?.time !== undefined && (
            <div style={styles.metaItem}>
              <Clock style={styles.icon} />
              <span style={styles.metaValue}>{formatTime(Event_INFO.time)}</span>
            </div>
          )}

          {/* Location */}
          {Event_INFO?.location && (
            <div style={styles.metaItem}>
              <MapPin style={styles.icon} />
              <span style={styles.metaValue}>{Event_INFO.location}</span>
            </div>
          )}

          {/* Category */}
          {Event_INFO?.category && (
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Category:</span>
              <span style={styles.metaValue}>{Event_INFO.category}</span>
            </div>
          )}

          {/* RSVP Count */}
          <div style={styles.metaItem}>
            <span style={styles.metaLabel}>RSVP Count:</span>
            <span style={styles.metaValue}>{Event_INFO.rsvpCount || 0}</span>
          </div>
        </div>

        {/* RSVP Section */}
        <section style={styles.rsvpSection}>
          <h2 style={styles.rsvpHeader}>RSVP List</h2>
          {RSVP_LIST && RSVP_LIST.length > 0 ? (
            <ul style={styles.rsvpList}>
              {RSVP_LIST.map((rsvp, index) => (
                <li key={index} style={styles.rsvpItem}>
                  <span style={styles.rsvpName}>{rsvp.name || "Anonymous"}</span>
                  {/* If email or other details are available, you can display them here */}
                  {/* <span style={styles.rsvpEmail}>{rsvp.email || "No Email"}</span> */}
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.noRsvp}>No RSVPs yet.</p>
          )}
        </section>

        {/* Back Button */}
        <Link to="/events" style={styles.backButton}>
          &larr; Back to Events
        </Link>
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
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#333333",
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    fontSize: "1.1rem",
    marginBottom: "30px",
    color: "#555555",
    lineHeight: "1.6",
    textAlign: "center",
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
    color: "#007bff", // Blue color for labels
  },
  metaValue: {
    color: "#000000", // Black color for values
  },
  icon: {
    marginRight: "8px",
    color: "#007bff", // Blue color for icons
  },
  rsvpSection: {
    marginTop: "20px",
  },
  rsvpHeader: {
    fontSize: "1.8rem",
    marginBottom: "15px",
    color: "#333333",
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: "8px",
    fontWeight: "600",
    textAlign: "center",
  },
  rsvpList: {
    listStyleType: "none",
    paddingLeft: "0",
    margin: "0",
  },
  rsvpItem: {
    padding: "10px 0",
    borderBottom: "1px solid #e0e0e0",
    color: "#555555",
    fontSize: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rsvpName: {
    fontWeight: "500",
    color: "#007bff", // Blue color for names
  },
  rsvpEmail: {
    fontStyle: "italic",
    color: "#777777",
  },
  noRsvp: {
    fontStyle: "italic",
    color: "#999999",
    fontSize: "1rem",
    textAlign: "center",
  },
  errorCard: {
    backgroundColor: "#ffe6e6",
    border: "1px solid #ffcccc",
  },
  errorTitle: {
    fontSize: "2rem",
    marginBottom: "15px",
    color: "#d32f2f",
    fontWeight: "700",
    textAlign: "center",
  },
  errorMessage: {
    fontSize: "1rem",
    color: "#d32f2f",
    textAlign: "center",
  },
  noDetailsCard: {
    backgroundColor: "#f9f9f9",
  },
  noDetailsTitle: {
    fontSize: "2rem",
    marginBottom: "15px",
    color: "#555555",
    fontWeight: "700",
    textAlign: "center",
  },
  backButton: {
    display: "block",
    marginTop: "20px",
    textAlign: "center",
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "600",
    transition: "color 0.3s",
  },
  backButtonHover: {
    color: "#0056b3",
  },
  backLink: {
    display: "block",
    marginTop: "10px",
    textAlign: "center",
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "600",
    transition: "color 0.3s",
  },
  backLinkHover: {
    color: "#0056b3",
  },
  spinner: {
    fontSize: "1.5rem",
    color: "#555555",
    textAlign: "center",
  },
};

export default EventDetails;
