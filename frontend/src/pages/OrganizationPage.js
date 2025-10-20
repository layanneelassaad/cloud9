// src/pages/OrganizationPage.js
/*
 * CALLS THE CompositeAPI.js FETCH_ORGANIZATION FUNCTION
 * renders an organization's information and events
 * 
 */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrganizationDetails } from "../api/CompositeApi";
import EventCard from '../components/EventCard'; // Ensure this path matches the actual file location
import styled from 'styled-components';

// Styled component for the header
const WelcomeHeader = styled.h1`
    color: #333;
    font-size: 3rem; // 32px
    margin-top: 0;
    margin-bottom: 0.5em; // 8px
`;

// Styled component for the descriptive text
const WelcomeText = styled.p`
    color: #666;
    font-size: 1.125rem; // 18px
    margin-top: 0;
    margin-bottom: 1em; // 16px
`;

// Styled component for the action button
const WebsiteButton = styled.a`
    background-color: #0056b3;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #004494;
    }
`;

// Main container for the welcome section
const WelcomeContainer = styled.div`
    text-align: center;
    padding: 20px;
    margin: 20px auto;
    max-width: 600px;
`;

const DescriptionText = styled.p`
    font-size: 1.125rem; // 18px, equivalent to 'text-lg' in Tailwind
    margin-top: 0.5em; // 8px, equivalent to 'mt-2' in Tailwind
    color: #666;
    text-align: justify;
    margin-bottom: 10px;
`;

const EventsHeader = styled.h2`
  color: #333; // Dark color for good contrast
  font-size: 1.75rem; // Equivalent to larger than Tailwind's 'text-xl'
  margin-top: 1em; // Some spacing above the header
  margin-bottom: 0.5em; // Spacing below the header before any content
  text-align: center; // Center the header text
`;


const OrganizationPage = () => {
    const [organizationInfo, setOrganizationInfo] = useState(null);
    const [organizationEvents, setOrganizationEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { organizationID } = useParams();

    useEffect(() => {
        const loadOrgDetails = async () => {
            try {
                const data = await fetchOrganizationDetails(organizationID);
    
                setOrganizationInfo(data.organization_information);
                setOrganizationEvents(data.organization_events);
                setLoading(false);

            } catch (err) {
                console.error("Failed to fetch organization details:", err);
                setError("Unable to load organization details. Please try again later.");
                setLoading(false);
            }
        };
    
        loadOrgDetails();
    }, [organizationID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>

            <WelcomeContainer>
                <WelcomeHeader>Welcome to {organizationInfo?.name}!</WelcomeHeader>
                <DescriptionText>
                    Discover the wonders and activities of {organizationInfo?.name}. We're thrilled to have you explore our events, learn more about our community, and get involved!
                </DescriptionText>
                <div className="mt-4">
                    <WebsiteButton href={organizationInfo?.website_url} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Visit Our Website
                    </WebsiteButton>
                </div>
            </WelcomeContainer>
            <div>
                <EventsHeader>Upcoming Events</EventsHeader>
                {organizationEvents.length > 0 ? (
                    <div className="flex flex-wrap justify-center">
                        {organizationEvents.map(event => (
                            <EventCard
                             event={event} // Use the correct RSVP count
                            />
                        ))}
                    </div>
                ) : <p>No upcoming events.</p>}
            </div>
        </div>
    );
}

export default OrganizationPage;

