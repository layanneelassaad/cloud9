// src/api/EventsApi.js

import axios from "axios";

// CORS Proxy URL (add a public proxy as a temporary solution for development)
const EVENTS_MANAGEMENT_URL = "http://localhost:8001/"; // Running events locally

// API client with the CORS proxy appended to the base URL
const apiClient = axios.create({
  baseURL: EVENTS_MANAGEMENT_URL,
  timeout: 5000, // Set a reasonable timeout
});

// Fetch events from the FastAPI backend
export const fetchEvents = async () => {
  try {
    const response = await apiClient.get("/events");
    console.log("Raw API response:", response.data);
    
    // Ensure response is an array
    if (!Array.isArray(response.data)) {
      throw new Error("API returned data in an unexpected format.");
    }

    return response.data; // Directly return the array
  } catch (error) {
    if (error.response) {
      console.error("Response error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("General error:", error.message);
    }
    throw new Error("Failed to fetch events. Please check your API connection.");
  }
};


// TODO: create a fetchEvent function
