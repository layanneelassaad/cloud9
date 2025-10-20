import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";


const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString("en-CA");
    navigate(`/date/${formattedDate}`);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.calendarWrapper}>
        <h3 style={styles.title}>Calendar</h3>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="custom-calendar"
          tileContent={({ date, view }) =>
            view === "month" && date.getDate() === 10 ? (
              <div style={styles.eventMarker}>🎉 Event</div>
            ) : null
          }
        />
      </div>
      <style>
  {`
    
    .custom-calendar {
      border: 2px solid black; 
      background-color: white;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

   
    .react-calendar__navigation {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      border-bottom: 2px solid black; 
    }

    .react-calendar__navigation button {
      color: #3b82f6;
      font-size: 1rem;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    .react-calendar__navigation button:hover {
      color: #1e6fc1;
    }

    
    .react-calendar__tile {
      padding: 12px 0;
      text-align: center;
      font-size: 0.95rem;
      font-weight: 500;
      color: #333;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    .react-calendar__tile:enabled:hover {
      background-color: #e6f0fd;
      color: #1e6fc1;
      cursor: pointer;
    }
    .react-calendar__tile--active {
      background-color: #3b82f6;
      color: white;
      font-weight: bold;
      border-radius: 8px;
    }

    
    .event-marker {
      font-size: 0.8rem;
      color: #e63946;
      font-weight: bold;
      margin-top: 5px;
    }

    
    .react-calendar__month-view__weekdays {
      font-weight: bold;
      font-size: 1.1rem; 
      text-transform: uppercase;
      color: #555;
    }
  `}
</style>

    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
  },
  calendarWrapper: {
    width: "100%",
    maxWidth: "600px",
    padding: "0 20px",
    marginBottom: "50px", 
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
  },
  eventMarker: {
    fontSize: "0.8rem",
    color: "#e63946",
    marginTop: "5px",
  },
};

export default CalendarComponent;

// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import { useNavigate } from "react-router-dom";
// import "react-calendar/dist/Calendar.css";

// const MasterCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const navigate = useNavigate();

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     const formattedDate = date.toLocaleDateString("en-CA");
//     navigate(`/date/${formattedDate}`);
//   };

//   return (
//     <div style={styles.container}>
//       <Calendar
//         onChange={handleDateChange}
//         value={selectedDate}
//         aria-label="Calendar widget to select a date"
//         tileContent={({ date, view }) => (
//           <div aria-label={`Date: ${date.toLocaleDateString("en-US")}`}>
//             {view === "month" && date.getDate() === 10 && (
//               <p style={styles.eventMarker}>🎉 Event</p>
//             )}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     padding: "20px",
//     margin: "20px auto",
//     maxWidth: "400px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     textAlign: "center",
//     backgroundColor: "#f9f9f9",
//   },
//   heading: {
//     marginBottom: "10px",
//     fontSize: "1.5rem",
//     color: "#333",
//   },
//   eventMarker: {
//     color: "red",
//     fontSize: "0.8rem",
//   },
// };

// export default MasterCalendar;
