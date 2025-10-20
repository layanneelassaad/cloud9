// // src/pages/Events.js
// src/pages/Events.js
import React, { useContext, useEffect, useState } from "react";
import { EventsContext } from "../context/EventsContext";
import EventCard from "../components/EventCard";
import { fetchEventDetails } from "../api/CompositeApi";
import "./Events.css"; // Keep your CSS if needed for the spinner, etc.

const Events = () => {
  const { events, loading, error, loadEvents } = useContext(EventsContext);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rsvpCounts, setRsvpCounts] = useState({});

  // useEffect(() => {
  //   setFilteredEvents(events);

  //   // Fetch RSVP counts for all events
  //   const fetchRsvpCounts = async () => {
  //     const counts = {};
  //     for (const event of events) {
  //       try {
  //         const details = await fetchEventDetails(event.id);
  //         counts[event.id] = details?.Event_INFO?.rsvpCount || 0;
  //       } catch (err) {
  //         console.error(
  //           `Failed to fetch details for event ID: ${event.id}`,
  //           err
  //         );
  //         counts[event.id] = 0; // Default to 0 on error
  //       }
  //     }
  //     setRsvpCounts(counts);
  //   };

  //   if (events.length > 0) fetchRsvpCounts();
  // }, [events]);

  // const handleSearch = (e) => {
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);

  //   if (!term) {
  //     setFilteredEvents(events);
  //     return;
  //   }

  //   const filtered = events.filter(
  //     (event) =>
  //       (event.name && event.name.toLowerCase().includes(term)) ||
  //       (event.description && event.description.toLowerCase().includes(term)) ||
  //       (event.location && event.location.toLowerCase().includes(term))
  //   );
  //   setFilteredEvents(filtered);
  // };

  const handleNewEvent = () => {
    const authUrl = "http://localhost:3000/event/create";
    window.location.href = authUrl;
  };

  // console.log("Rendering Events page. Filtered events:", filteredEvents);

  // if (loading) {
  //   return (
  //     <div style={styles.spinnerContainer}>
  //       <div className="spinner"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <div style={styles.error}>{error}</div>;
  // }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Events</h2>
        {/* <input
          type="text"
          placeholder="Search events by name..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchBar}
        /> */}
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleNewEvent}>
            ADD HERE
          </button>
          <button
            style={styles.button}
            onClick={() =>
              (window.location.href = "http://localhost:3000/eventbrite")
            }
          >
            ADD FROM EVENTBRITE
          </button>
        </div>
        {/* {filteredEvents.length === 0 ? (
          <p style={styles.noEvents}>No events match your search.</p>
        ) : (
          <div style={styles.eventGrid}>
            {filteredEvents.map((event) => (
              <div key={event.id} style={styles.eventCardContainer}>
                <EventCard
                  event={event}
                  rsvpCount={rsvpCounts[event.id] || 0}
                />
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
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
  button: {
    backgroundColor: "#555",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center", // This centers the items horizontally
    alignItems: "center", // This centers the items vertically
    marginTop: "20px",
    flexDirection: "row",
    width: "100%",
    gap: "20px",
  },
};

export default Events;

// import React, { useContext, useEffect, useState } from "react";
// import { EventsContext } from "../context/EventsContext";
// import EventCard from "../components/EventCard";
// import "./Events.css"; // Keep your CSS if needed for the spinner, etc.

// const Events = () => {
//   const { events, loading, error, loadEvents } = useContext(EventsContext);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredEvents(events);
//   }, [events]);

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     if (!term) {
//       setFilteredEvents(events);
//       return;
//     }

//     const filtered = events.filter(
//       (event) =>
//         (event.name && event.name.toLowerCase().includes(term)) ||
//         (event.description && event.description.toLowerCase().includes(term)) ||
//         (event.location && event.location.toLowerCase().includes(term))
//     );
//     setFilteredEvents(filtered);
//   };

//   console.log("Rendering Events page. Filtered events:", filteredEvents);

//   if (loading) {
//     return (
//       <div style={styles.spinnerContainer}>
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div style={styles.error}>{error}</div>;
//   }

//   return (
//     <div style={styles.pageWrapper}>
//       <div style={styles.container}>
//         <h2 style={styles.heading}>Events</h2>
//         <input
//           type="text"
//           placeholder="Search events by name..."
//           value={searchTerm}
//           onChange={handleSearch}
//           style={styles.searchBar}
//         />
//         {filteredEvents.length === 0 ? (
//           <p style={styles.noEvents}>No events match your search.</p>
//         ) : (
//           <div style={styles.eventGrid}>
//             {filteredEvents.map((event) => (
//               <div key={event.id} style={styles.eventCardContainer}>
//                 <EventCard event={event} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageWrapper: {
//     // A subtle gradient background for the entire page
//     minHeight: "100vh",
//     background: "linear-gradient(to bottom right, #f9f9f9, #eef3f8)",
//     fontFamily: "'Roboto', sans-serif",
//   },
//   container: {
//     padding: "40px 20px",
//     maxWidth: "1200px",
//     margin: "0 auto",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "30px",
//     fontSize: "3rem",
//     color: "#333",
//     fontWeight: "700",
//     letterSpacing: "1px",
//     textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
//   },
//   searchBar: {
//     width: "100%",
//     padding: "12px 15px",
//     marginBottom: "30px",
//     fontSize: "1rem",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//     outline: "none",
//   },
//   eventGrid: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "30px",
//     justifyContent: "center",
//   },
//   eventCardContainer: {
//     // A wrapper around EventCard to ensure consistent spacing or add hover effects
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     borderRadius: "10px",
//   },
//   spinnerContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     background: "#f0f2f5",
//   },
//   error: {
//     textAlign: "center",
//     color: "#d9534f",
//     fontSize: "1.5rem",
//     marginTop: "50px",
//   },
//   noEvents: {
//     textAlign: "center",
//     color: "#555",
//     fontSize: "1.2rem",
//     marginTop: "20px",
//   },
// };

// export default Events;
