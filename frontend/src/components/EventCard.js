// // src/components/EventCard.js

// src/components/EventCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";

const EventCard = ({ event, rsvpCount = 0 }) => {
  const {
    id = "",
    organizationId = "",
    name = "Untitled Event",
    description = "No description provided.",
    date = "",
    time = 0,
    location = "No location specified.",
  } = event;

  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString + "T00:00:00");
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeInSeconds) => {
    const totalSeconds = timeInSeconds % 86400;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const linkStyle = {
    textDecoration: "underline",
    color: isHovered ? "#0056b3" : "#007bff", // Darker blue on hover
    transition: "color 0.3s",
    cursor: "pointer",
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 w-80 text-center flex flex-col items-center justify-between"
      style={{
        height: "320px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: "0.9rem", color: "#555", marginBottom: "8px" }}>
        Organization ID: {organizationId}
      </div>

      <h2
        className="text-xl font-bold text-gray-800 mb-3"
        style={{ margin: "0 0 8px 0", lineHeight: "1.2" }}
      >
        <Link
          to={`/event/${id}`}
          style={linkStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {name}
        </Link>
      </h2>

      <p
        className="text-gray-600 mb-4 text-center"
        style={{
          margin: "0 0 16px 0",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minHeight: "48px",
        }}
      >
        {description}
      </p>

      <div className="flex items-center mb-2 text-gray-700" style={{ fontSize: "0.9rem" }}>
        <Calendar className="mr-2 text-blue-500" size={20} />
        <span>{formatDate(date)}</span>
      </div>

      <div className="flex items-center mb-4 text-gray-700" style={{ fontSize: "0.9rem" }}>
        <Clock className="mr-2 text-green-500" size={20} />
        <span>{formatTime(time)}</span>
      </div>

      <div className="flex items-center mb-4 text-gray-700" style={{ fontSize: "0.9rem" }}>
        <MapPin className="mr-2 text-red-500" size={20} />
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "180px",
          }}
        >
          {location}
        </span>
      </div>

      <Link
        to={`/event/${id}/rsvp`}
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        style={{ marginTop: "auto" }}
      >
        RSVP ({rsvpCount || 0} attending)
      </Link>
    </div>
  );
};

export default EventCard;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Calendar, MapPin, Clock } from "lucide-react";

// const EventCard = ({ event }) => {
//   const {
//     id = "",
//     organizationId = "",
//     name = "Untitled Event",
//     description = "No description provided.",
//     date = "",
//     time = 0,
//     location = "No location specified.",
//     rsvpCount = 0, // We'll use rsvpCount || 0 when displaying
//   } = event;

//   const [isHovered, setIsHovered] = useState(false);

//   const formatDate = (dateString) => {
//     const dateObj = new Date(dateString + "T00:00:00");
//     return dateObj.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (timeInSeconds) => {
//     const totalSeconds = timeInSeconds % 86400;
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const period = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
//   };

//   const linkStyle = {
//     textDecoration: "underline",
//     color: isHovered ? "#0056b3" : "#007bff", // Darker blue on hover
//     transition: "color 0.3s",
//     cursor: "pointer",
//   };

//   return (
//     <div
//       className="bg-white shadow-md rounded-lg p-6 w-80 text-center flex flex-col items-center justify-between"
//       style={{
//         height: "320px",
//         boxSizing: "border-box",
//       }}
//     >
//       <div style={{ fontSize: "0.9rem", color: "#555", marginBottom: "8px" }}>
//         Organization ID: {organizationId}
//       </div>

//       <h2
//         className="text-xl font-bold text-gray-800 mb-3"
//         style={{ margin: "0 0 8px 0", lineHeight: "1.2" }}
//       >
//         <Link
//           to={`/event/${id}`}
//           style={linkStyle}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {name}
//         </Link>
//       </h2>

//       <p
//         className="text-gray-600 mb-4 text-center"
//         style={{
//           margin: "0 0 16px 0",
//           display: "-webkit-box",
//           WebkitLineClamp: 3,
//           WebkitBoxOrient: "vertical",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           minHeight: "48px",
//         }}
//       >
//         {description}
//       </p>

//       <div className="flex items-center mb-2 text-gray-700" style={{ fontSize: "0.9rem" }}>
//         <Calendar className="mr-2 text-blue-500" size={20} />
//         <span>{formatDate(date)}</span>
//       </div>

//       <div className="flex items-center mb-4 text-gray-700" style={{ fontSize: "0.9rem" }}>
//         <Clock className="mr-2 text-green-500" size={20} />
//         <span>{formatTime(time)}</span>
//       </div>

//       <div className="flex items-center mb-4 text-gray-700" style={{ fontSize: "0.9rem" }}>
//         <MapPin className="mr-2 text-red-500" size={20} />
//         <span
//           style={{
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//             maxWidth: "180px",
//           }}
//         >
//           {location}
//         </span>
//       </div>

//       {/* Applying the same fallback logic (rsvpCount || 0) used in EventDetails */}
//       <Link
//         to={`/event/${id}/rsvp`}
//         className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
//         style={{ marginTop: "auto" }}
//       >
//         RSVP ({rsvpCount || 0} attending)
//       </Link>
//     </div>
//   );
// };

// export default EventCard;
