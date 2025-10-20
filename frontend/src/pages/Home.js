// // src/pages/Home.js

// src/pages/Home.js
import React, { useContext, useEffect, useState } from "react";
import MasterCalendar from "../components/Calendar";
import EventCard from "../components/EventCard";
import { EventsContext } from "../context/EventsContext";
import { fetchEventDetails } from "../api/CompositeApi";

const Home = () => {
  const { events, loading, error, loadEvents } = useContext(EventsContext);
  const [popularEvents, setPopularEvents] = useState([]);
  const [rsvpCounts, setRsvpCounts] = useState({});

  useEffect(() => {
    const fetchRsvpCounts = async () => {
      const counts = {};
      for (const event of events) {
        try {
          const details = await fetchEventDetails(event.id);
          counts[event.id] = details?.Event_INFO?.rsvpCount || 0;
        } catch (err) {
          console.error(`Failed to fetch RSVP count for event ID: ${event.id}`, err);
          counts[event.id] = 0; // Default to 0 on error
        }
      }
      setRsvpCounts(counts);
    };

    if (events.length > 0) fetchRsvpCounts();
  }, [events]);

  useEffect(() => {
    // Sort events by RSVP count in descending order and take top 4
    const sorted = [...events]
      .map((event) => ({ ...event, rsvpCount: rsvpCounts[event.id] || 0 }))
      .sort((a, b) => b.rsvpCount - a.rsvpCount)
      .slice(0, 4);
    setPopularEvents(sorted);
  }, [events, rsvpCounts]);

  console.log("Rendering Home page. Popular events:", popularEvents);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <MasterCalendar />
        <h3 style={styles.title}>Popular Events</h3>
        {loading && <p style={styles.loading}>Loading popular events...</p>}
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.popularEventsGrid}>
          {popularEvents.map((event) => (
            <div key={event.id} style={styles.eventCardContainer}>
              <EventCard event={event} rsvpCount={event.rsvpCount} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #f9f9f9, #eef3f8)",
    fontFamily: "'Roboto', sans-serif",
    padding: "20px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    color: "#555",
    fontSize: "1.2rem",
  },
  error: {
    textAlign: "center",
    color: "#d9534f",
    fontSize: "1.2rem",
  },
  popularEventsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  eventCardContainer: {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    borderRadius: "10px",
  },
};

export default Home;


// import React, { useContext, useEffect, useState } from "react";
// import MasterCalendar from "../components/Calendar";
// import EventCard from "../components/EventCard";
// import { EventsContext } from "../context/EventsContext";


// const Home = () => {
//   const { events, loading, error, loadEvents } = useContext(EventsContext);
//   const [popularEvents, setPopularEvents] = useState([]);

//   useEffect(() => {
//     // Sort events by rsvpCount in descending order and take top 4
//     const sorted = [...events].sort((a, b) => (b.rsvpCount || 0) - (a.rsvpCount || 0)).slice(0, 4);
//     setPopularEvents(sorted);
//   }, [events]);

//   console.log("Rendering Home page. Popular events:", popularEvents);

//   return (
//     <div style={styles.pageWrapper}>
//       <div style={styles.container}>
//         <MasterCalendar />
//         <h3 style={styles.title}>Popular Events</h3>
//         {loading && <p style={styles.loading}>Loading popular events...</p>}
//         {error && <p style={styles.error}>{error}</p>}
//         <div style={styles.popularEventsGrid}>
//           {popularEvents.map((event) => (
//             <div key={event.id} style={styles.eventCardContainer}>
//               <EventCard event={event} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageWrapper: {
//     minHeight: "100vh",
//     background: "linear-gradient(to bottom right, #f9f9f9, #eef3f8)",
//     fontFamily: "'Roboto', sans-serif",
//     padding: "20px",
//   },
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "1.8rem",
//     fontWeight: "bold",
//     color: "#333",
//   },
//   loading: {
//     textAlign: "center",
//     color: "#555",
//     fontSize: "1.2rem",
//   },
//   error: {
//     textAlign: "center",
//     color: "#d9534f",
//     fontSize: "1.2rem",
//   },
//   popularEventsGrid: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "20px",
//     justifyContent: "center",
//   },
//   eventCardContainer: {
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     borderRadius: "10px",
//   },
// };

// export default Home;
