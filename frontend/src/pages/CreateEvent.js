import React, { useState } from "react";
import axios from "axios";
import { fetchOrganizations } from "../api/OrganizationApi";

const CreateEvent = ({ onCreate }) => {
  // Add a field for Organization name
  const [organizationName, setOrganizationName] = useState("");
  const [error, setError] = useState("");

  const [event, setEvent] = useState({
    organizationId: null, // Default to null until resolved
    name: "",
    description: " ", // Optional
    date: "",
    time: "",
    location: " ", // Optional
    category: " ", // Optional
    rsvpCount: 0, // Default value handled by the backend
  });

  const handleOrganizationChange = (e) => {
    setOrganizationName(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Obtain the OrganizationId
      const allOrganizations = await fetchOrganizations();
      console.log("Fetched Organizations:", allOrganizations);

      // Check if the organization exists
      const matchedOrg = allOrganizations.find(
        (org) => org.name.toLowerCase() === organizationName.toLowerCase()
      );

      if (!matchedOrg) {
        // Organization not found
        setError(
          "Organization not found. Please enter a valid organization name."
        );
        return; // Exit if organization is invalid
      }

      // Create a new event object that includes the matched organization's ID
      const eventData = {
        ...event,
        organizationId: matchedOrg.id,
      };

      console.log("Sending event data:", eventData);

      // Submit the event
      const response = await axios.post(
        "http://3.219.96.214:8001/events",
        eventData
      );
      console.log("Event created:", response.data);

      // Reset the form after successful submission
      setEvent({
        organizationId: null,
        name: "",
        description: " ",
        date: "",
        time: "",
        location: " ",
        category: " ",
        rsvpCount: 0,
      });
      setOrganizationName(""); // Reset organization name input

      // Call the onCreate callback if provided
      if (onCreate) onCreate(response.data);
    } catch (error) {
      console.error("Error creating event:", error.message);
      setError("Failed to create event. Please check the form and try again.");
    }
  };

  // Inline styles
  const styles = {
    formContainer: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      maxWidth: "500px",
      margin: "0 auto",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "25px",
      textAlign: "center",
      color: "#333",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
    },
    button: {
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      padding: "12px 20px",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "bold",
      width: "100%",
    },
    error: {
      color: "#dc3545",
      marginBottom: "15px",
      textAlign: "center",
      fontWeight: "500",
    },
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit}>
      <h2 style={styles.title}>Create Event</h2>

      {error && <div style={styles.error}>{error}</div>}

      <div>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={event.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div>
        <label style={styles.label}>Organization Name:</label>
        <input
          type="text"
          value={organizationName}
          onChange={handleOrganizationChange}
          required
          style={styles.input}
        />
      </div>

      <div>
        <label style={styles.label}>Description:</label>
        <input
          type="text"
          name="description"
          value={event.description}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <div>
        <label style={styles.label}>Date:</label>
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div>
        <label style={styles.label}>Time:</label>
        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div>
        <label style={styles.label}>Location:</label>
        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <div>
        <label style={styles.label}>Category:</label>
        <input
          type="text"
          name="category"
          value={event.category}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.button}>
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;
