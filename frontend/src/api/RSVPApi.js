// src/api/RSVPApi.js
import axios from "axios";

const RSVP_API_URL = "http://localhost:8003/";

export const submitRSVP = async (eventId, userInfo) => {
  const payload = {
    event_id: parseInt(eventId, 10),
    event_name: "Event Name Placeholder",
    name: userInfo.name,
    email: userInfo.email,
    status: "confirmed"
  };

  console.log("Submitting RSVP with payload:", payload);

  try {
    const response = await axios.post(`${RSVP_API_URL}/events/${eventId}/rsvps/`, payload);
    console.log("RSVP API response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    throw error;
  }
};
