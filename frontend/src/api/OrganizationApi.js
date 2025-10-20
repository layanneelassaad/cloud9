// src/api/OrganizationApi.js
import axios from "axios";

// CORS Proxy URL (add a public proxy as a temporary solution for development)
const ORGANIZATION_URL = "http://localhost:8002/"; // Running organizations locally


// API client with the CORS proxy appended to the base URL
const apiClient = axios.create({
  baseURL:  ORGANIZATION_URL,
  timeout: 5000, // Set a reasonable timeout
});

export const fetchOrganizations = async () => {
    console.log("Fetching organizations...");
    try {
      const response = await apiClient.get("/organizations"); // Correct endpoint
      console.log("Organizations fetched successfully:", response.data);
      console.log("API response:", response); // Log full response
      return response.data;
    } catch (error) {
      console.error("Error fetching organizations:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      throw new Error("Failed to fetch organizations. Please check your API connection.");
    }
  };

//TODO: GET ORG NAME FROM ID
export const fetchOrgName = async (organizationID) => {
  console.log(`Fetching Name for Organization: ${organizationID}`);
  try {
    const response = await apiClient.get(`/organizations/${organizationID}`);
    console.log(`Details fetched for organization ID ${organizationID}:`, response.data);
    return response.data.name;
  } catch (error) {
    console.error(`Error fetching details for Org: ${organizationID}:`, error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw new Error(`Failed to fetch Org Name ${organizationID}.`);

  }
}
