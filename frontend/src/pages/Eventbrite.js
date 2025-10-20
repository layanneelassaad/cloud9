import React, { useEffect, useState } from "react";
import axios from "axios";

const EVENTBRITE_API_URL = "https://www.eventbriteapi.com/v3";
const EVENTBRITE_API_KEY = "COO6A6DC7IILRY2QGV";
const REDIRECT_URI = "http://localhost:3000/eventbrite"; // Your redirect URI

const EventCard = ({ event }) => {
  return (
    <div style={styles.card}>
      <h3>{event.name.text}</h3>
      <p>{event.description.text}</p>
      <p>
        <strong>Date:</strong> {event.start.local.split("T")[0]}
      </p>
      <p>
        <strong>Time:</strong> {event.start.local.split("T")[1].substring(0, 5)}
      </p>
      <p>
        <strong>Location:</strong> {event.venue ? event.venue.name : "Online"}
      </p>
      <p>
        <strong>Category:</strong>{" "}
        {event.category ? event.category.name : "Uncategorized"}
      </p>
    </div>
  );
};

const Eventbrite = () => {
  const [events, setEvents] = useState([]);
  const [eventsFetched, setEventsFetched] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    console.log(access_token);
    if (access_token) {
      console.log("working");
      // Exchange authorization code for access token
      console.log(access_token);
      fetchAccessToken(access_token);
    }
  }, []);

  const fetchAccessToken = async (token) => {
    try {
      fetchEvents(token);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const fetchEvents = async (token) => {
    try {
      console.log("Fetching organization ID");
      const orgResponse = await axios.get(
        "https://www.eventbriteapi.com/v3/users/me/organizations/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming you want the first organization from the list
      const organizationId = orgResponse.data.organizations[0].id;
      console.log(organizationId);

      console.log("Fetching events");
      // Fetch events using the organization ID
      const eventsResponse = await axios.get(
        `${EVENTBRITE_API_URL}/organizations/${organizationId}/events/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents(eventsResponse.data.events);
      setEventsFetched(true);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const postEvent = async (event, organizationId) => {
    try {
      const eventData = {
        id: event.id,
        organizationId: organizationId,
        name: event.name.text || "No Name Provided", // Default name
        description: event.description.text
          ? event.description.text
          : "No Description Available", // Default description
        date: event.start.local.split("T")[0] || "Date Not Available", // Default date
        time:
          event.start.local.split("T")[1]?.substring(0, 5) ||
          "Time Not Available", // Default time
        location: event.venue ? event.venue.name : "Online", // Default location
        category: event.category ? event.category.name : "Uncategorized", // Default category
        rsvpCount: event.capacity || 0, // Default RSVP count
      };

      const response = await axios.post(
        "http://3.219.96.214:8001/events",
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Event posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting event:", error);
    }
  };

  const handlePostEvents = async () => {
    if (!events.length) return; // Check if there are events to post
    try {
      const organizationId = events[0].organization_id; // Assuming all events belong to the same organization
      for (const event of events) {
        await postEvent(event, organizationId); // Post each event
      }
      window.location.href = "http://localhost:3000";
    } catch (error) {
      console.error("Error posting events:", error);
    }
  };

  const handleLogin = () => {
    const authUrl = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=COO6A6DC7IILRY2QGV&redirect_uri=http://localhost:3000/eventbrite`;
    console.log(authUrl);
    window.location.href = authUrl;
  };

  return (
    <div style={styles.container}>
      {!eventsFetched && ( // Conditional rendering of the button
        <button style={styles.button} onClick={handleLogin}>
          ADD FROM EVENTBRITE
        </button>
      )}
      <div style={styles.events}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {eventsFetched && ( // Conditional rendering of the button
        <button style={styles.button} onClick={handlePostEvents}>
          POST EVENTS
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Stack items vertically
    alignItems: "center", // Center items horizontally
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#555",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px", // Add margin below buttons for spacing
  },
  events: {
    display: "flex",
    flexDirection: "row",
  },
  eventList: {
    display: "flex",
    flexWrap: "wrap", // Allow wrapping of cards
    justifyContent: "center", // Center cards horizontally
    gap: "20px", // Space between cards
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "15px",
    width: "200px",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
    margin: "15px",
  },
};

export default Eventbrite;
