// src/api/CompositeApi.js
import axios from "axios";

// CORS Proxy URL (temporary solution for development)
const COMPOSITE_SERVICE_URL = "http://localhost:8000/"; // Replace with actual IP and port

// API client with the CORS proxy appended to the base URL
const compositeApiClient = axios.create({
  baseURL: COMPOSITE_SERVICE_URL,
  timeout: 5000,
});

// Fetch detailed event information from the composite-service
export const fetchEventDetails = async (eventId) => {
  console.log(`Fetching details for event ID: ${eventId}`);
  try {
    const response = await compositeApiClient.get(`/event/${eventId}/rsvps`);
    console.log(`Details fetched for event ID ${eventId}:`, response.data);
    return response.data; // Returns { Event_INFO, RSVP_LIST }
  } catch (error) {
    console.error(`Error fetching details for event ${eventId}:`, error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw new Error(`Failed to fetch details for event ID ${eventId}.`);
  }
};

//TODO: fetch an Organizations's information and all their events
export const fetchOrganizationDetails = async (organizationID) => {

  console.log(`Fetching details for Organization: ${organizationID}`);
  try {
    const response = await compositeApiClient.get(`/organization/event/${organizationID}`);
    console.log(`Details fetched for organization ID ${organizationID}:`, response.data);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching details for event ${organizationID}:`, error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw new Error(`Failed to fetch details for event ID ${organizationID}.`);

  }

} 