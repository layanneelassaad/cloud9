import React, { useContext, useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { EventsContext } from "../context/EventsContext";
import { fetchEventDetails } from "../api/CompositeApi";
import EventCard from "../components/EventCard";
import styled from "styled-components";


const MyCalendar = () => {
    const { user } = useAuth();
    const { events, loading: eventsLoading, error: eventsError, loadEvents } = useContext(EventsContext);

    const [userList, setUserList] = useState([]);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState(null);
    const [hasFetchedDetails, setHasFetchedDetails] = useState(false);

    // Load events after user logs in (only once)
    // Make sure loadEvents does not trigger continuous updates in EventsContext
    useEffect(() => {
        if (user) {
            // loadEvents should ideally only fetch once or only when needed.
            // If loadEvents is stable and doesn't cause repeated updates, this should be fine.
            loadEvents();
        }
    }, [user]);

    // Once we have stable events, derive their IDs
    // If events keep changing, figure out why in EventsContext.
    const Event_IDS = events.map(event => event.id);

    // Fetch details only after we have events and user is logged in
    // Add a guard state (hasFetchedDetails) so we only do it once.
    useEffect(() => {
        // If no user or no events, or we already fetched details, do nothing
        if (!user || events.length === 0 || hasFetchedDetails) return;

        let isMounted = true; // To prevent state updates if component unmounts

        const fetchAllDetails = async () => {
            setDetailsLoading(true);
            setDetailsError(null);
            const newUserList = [];

            try {
                for (const event_ID of Event_IDS) {
                    const eventDetails = await fetchEventDetails(event_ID);
                    const { Event_INFO, RSVP_LIST } = eventDetails;
                    const userEmail = user.email;

                    // Check if user email is in RSVP_LIST
                    const userInRSVP = RSVP_LIST.some(rsvp => rsvp.email === userEmail);
                    if (userInRSVP) {
                        newUserList.push(Event_INFO);
                    }
                }

                if (isMounted) {
                    setUserList(newUserList);
                    setHasFetchedDetails(true); // Mark that we've fetched details
                }
            } catch (err) {
                console.error("Error fetching event details:", err);
                if (isMounted) {
                    setDetailsError(err.message || "An unexpected error occurred.");
                }
            } finally {
                if (isMounted) {
                    setDetailsLoading(false);
                }
            }
        };

        fetchAllDetails();

        return () => {
            isMounted = false;
        };
    }, [user, events, Event_IDS, hasFetchedDetails]);

    console.log("User email: ", user?.email);
    console.log("All events:", events);
    console.log("Event IDs:", Event_IDS);
    console.log("UserList: ", userList);

    if (eventsLoading || detailsLoading) {
        return <div>Loading...</div>;
    }

    if (eventsError || detailsError) {
        return <div style={{ color: "red" }}>{eventsError || detailsError}</div>;
    }

    return (
        <div>
            <h1>My Calendar</h1>
            <p>{user ? `Logged in as: ${user.email}` : "No user logged in."}</p>
            <h2>My Events</h2>

            {userList.length > 0 ? (
                <div style={styles.eventGrid}>
                    {userList.map((event, index) => (
                        <div key={event.id} style={styles.eventCardContainer}>
                            <EventCard event={event}/>
                        </div>
                    ))}
                </div>


            ) : (
                <p>No events found for this user.</p>
            )}
        </div>
    );
};

const styles = {
    pageWrapper: {
        // A subtle gradient background for the entire page
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f9f9f9, #eef3f8)",
        fontFamily: "'Roboto', sans-serif",
    },
    container: {
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    heading: {
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "3rem",
        color: "#333",
        fontWeight: "700",
        letterSpacing: "1px",
        textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
    },
    searchBar: {
        width: "100%",
        padding: "12px 15px",
        marginBottom: "30px",
        fontSize: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        outline: "none",
    },
    eventGrid: {
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        justifyContent: "center",
    },
    eventCardContainer: {
        // A wrapper around EventCard to ensure consistent spacing or add hover effects
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        borderRadius: "10px",
    },
    spinnerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
    },
    error: {
        textAlign: "center",
        color: "#d9534f",
        fontSize: "1.5rem",
        marginTop: "50px",
    },
    noEvents: {
        textAlign: "center",
        color: "#555",
        fontSize: "1.2rem",
        marginTop: "20px",
    },
};

export default MyCalendar;
