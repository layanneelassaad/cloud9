import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEvents } from "../api/EventsApi";
import EventCard from "../components/EventCard";
import DayCalendar from "../components/DayCalendar";

// Helper function to convert decimal time to HH:MM format
const convertDecimalToTime = (decimalTime) => {
  if (decimalTime == null) return '00:00';

  const hours = Math.floor(decimalTime);
  const minutes = Math.round((decimalTime - hours) * 60);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const DatePage = () => {
  const { date } = useParams(); // Get date from URL
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetchEvents
  //filter by date
  // display events occuring 

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEvents();

        // Filter events that match the selected date
        const filteredEvents = fetchedEvents.events.filter(event => {
          if (!event.date) {
            console.warn('Event is missing date:', event);
            return false;
          }
          return event.date === date;
        });

        const formattedEvents = filteredEvents.map(event => ({
          ...event,
          startTime: convertDecimalToTime(event.time),
          endTime: convertDecimalToTime((event.time || 0) + 1)
        }));

        // setEvents(sortedEvents);
        setEvents(formattedEvents);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Unable to load popular events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [date]);

  console.log('URL date parameter:', date);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const displayDate = new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      {/* Day Calendar View */}
      <DayCalendar
        date={date}
        events={events.map(event => ({
          id: event.id,
          title: event.name,
          startTime: convertDecimalToTime(event.time),
          endTime: convertDecimalToTime((event.time || 0) + 1),
          location: event.location
        }))}
      />
    </div>
  );
  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
  //     {/* Day Calendar View */}
  //     <DayCalendar
  //       date={date}
  //       events={events.map(event => ({
  //         title: event.name,
  //         startTime: convertDecimalToTime(event.time),
  //         endTime: convertDecimalToTime((event.time || 0) + 1),
  //         location: event.location
  //       }))}
  //     />
  //   </div>
  // );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  dateText: {
    fontSize: "1.5rem",
    color: "#555",
  },
};

export default DatePage;
// import React from "react";
// import { useParams } from "react-router-dom";
// // import { fetchEvents} from "../api/EventsApi"

// const DatePage = () => {
//   const { date } = useParams(); // Get date from URL

//   //fetchEvents
//   //filter by date
//   // display events occuring 

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Selected Date</h2>
//       <p style={styles.dateText}>
//         You selected: <strong>{date}</strong>
//         TODO: make an api call to events
//       </p>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     textAlign: "center",
//   },
//   heading: {
//     fontSize: "2rem",
//     marginBottom: "10px",
//   },
//   dateText: {
//     fontSize: "1.5rem",
//     color: "#555",
//   },
// };

// export default DatePage;