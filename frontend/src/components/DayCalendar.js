import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Link } from "react-router-dom";

const DayCalendar = ({ events, date }) => {
    console.log("Events prop in DayCalendar:", events);

    const convertSecondsToTime = (seconds) => {
        if (seconds == null || isNaN(seconds)) {
            console.error("Invalid seconds:", seconds);
            return null;
        }
        const hours = Math.floor(seconds / 3600) % 24;
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const normalizedEvents = events.map(event => {
        let startSeconds = parseInt(event.startTime, 10);
        let endSeconds = parseInt(event.endTime, 10);

        console.log("Event time (start in seconds):", startSeconds);
        console.log("Event time (end in seconds):", endSeconds);

        return {
            ...event,
            startTime: convertSecondsToTime(startSeconds || 0),
            endTime: convertSecondsToTime((endSeconds || 0) + 3600),
        };
    });

    const sortedEvents = [...normalizedEvents].sort((a, b) =>
        new Date(`1970/01/01 ${a.startTime}`) - new Date(`1970/01/01 ${b.startTime}`)
    );


    const calculateEventStyles = (event) => {
        const timeToMinutes = (time) => {
            if (!time) return 0;
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const startMinutes = timeToMinutes(event.startTime);
        const endMinutes = timeToMinutes(event.endTime);

        // Validate start and end times
        if (startMinutes < 0 || startMinutes >= 1440 || endMinutes <= startMinutes) {
            console.error(`Invalid time range for event: ${event.name}`, event);
            return null;
        }

        return {
            top: `${(startMinutes / 1440) * 100}%`,   // Removed the -2px offset
            height: `${((endMinutes - startMinutes) / 1440) * 100}%`,
        };
    };

    // columns for when there's multiple events at the same time 
    const assignColumns = (events) => {
        const toMinutes = (time) => {
            const [h, m] = time.split(':').map(Number);
            return h * 60 + m;
        };

        let activeEvents = [];
        let columnCount = 0;

        for (let i = 0; i < events.length; i++) {
            const currentEvent = events[i];
            const currentStart = toMinutes(currentEvent.startTime);
            const currentEnd = toMinutes(currentEvent.endTime);

            // Remove events from activeEvents that have ended before this event starts
            activeEvents = activeEvents.filter(e => toMinutes(e.endTime) > currentStart);

            // Find the lowest column index not in use
            const usedColumns = activeEvents.map(e => e.column);
            let colIndex = 0;
            while (usedColumns.includes(colIndex)) {
                colIndex++;
            }

            // Assign the column index and push into activeEvents
            currentEvent.column = colIndex;
            activeEvents.push(currentEvent);

            // Track the max column count encountered
            columnCount = Math.max(columnCount, colIndex + 1);
        }

        events.forEach(e => {
            e.totalColumns = columnCount;
        });

        return events;
    };


    const eventsWithColumns = assignColumns(sortedEvents);

    eventsWithColumns.forEach(event => {
        console.log(`Event: ${event.title}, Event ID: ${event.id}, Start: ${event.startTime}, End: ${event.endTime}, Column: ${event.column}, Total Columns: ${event.totalColumns}`);
    });

    // Generate hours for the day
    const hours = Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 || 12;
        const ampm = i < 12 ? 'AM' : 'PM';
        return `${hour} ${ampm}`;
    });

    return (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative">
            <div className="text-2xl font-bold text-center py-4">
                {new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </div>

            <div className="flex">
                {/* Hours Column */}
                <div className="w-20 border-r relative">
                    {hours.map((hour) => (
                        <div
                            key={hour}
                            className="h-16 border-b flex items-center justify-center text-sm text-gray-500"
                        >
                            {hour}
                        </div>
                    ))}
                </div>

                {/* Events Container */}
                <div className="flex-1 relative">
                    {hours.map((hour, index) => (
                        <div key={index} className="h-16 border-b relative"></div>
                    ))}
                    {eventsWithColumns.map((event, eventIndex) => {
                        const eventStyles = calculateEventStyles(event);
                        if (!eventStyles) return null;

                        const widthPercent = 100 / event.totalColumns;
                        const leftPercent = event.column * widthPercent;

                        const isEven = eventIndex % 2 === 0;
                        const bgColor = isEven ? 'bg-blue-100 border-blue-500' : 'bg-green-100 border-green-500';
                        console.log(event);
                        return (
                            <Link
                                key={eventIndex}
                                to={`/event/${event.id || 'unknown'}`}
                                className="absolute"
                                style={{
                                    top: eventStyles.top,
                                    height: eventStyles.height,
                                    minHeight: '2rem',
                                    left: `${leftPercent}%`,
                                    width: `${widthPercent}%`,
                                }}
                            >
                                <div className={`p-1.5 border-l-4 ${bgColor}`}>
                                    <div className="font-semibold text-sm mb-1">
                                        {event.title}
                                    </div>

                                    {event.location && (
                                        <div className="text-xs text-gray-600 flex items-center mb-1">
                                            <MapPin size={14} className="mr-1" />
                                            {event.location}
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-600 flex items-center">
                                        <Clock size={14} className="mr-1" />
                                        {event.startTime} - {event.endTime}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DayCalendar;
// import React from 'react';
// import { Clock, MapPin } from 'lucide-react';

// const DayCalendar = ({ events, date }) => {
//     console.log("Events prop in DayCalendar:", events);

//     const convertSecondsToTime = (seconds) => {
//         if (seconds == null || isNaN(seconds)) {
//             console.error("Invalid seconds:", seconds);
//             return null;
//         }
//         const hours = Math.floor(seconds / 3600) % 24;
//         const minutes = Math.floor((seconds % 3600) / 60);
//         return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//     };

//     const normalizedEvents = events.map(event => {
//         let startSeconds = parseInt(event.startTime, 10);
//         let endSeconds = parseInt(event.endTime, 10);

//         console.log("Event time (start in seconds):", startSeconds);
//         console.log("Event time (end in seconds):", endSeconds);

//         return {
//             ...event,
//             startTime: convertSecondsToTime(startSeconds || 0),
//             endTime: convertSecondsToTime((endSeconds || 0) + 3600),
//         };
//     });

//     const sortedEvents = [...normalizedEvents].sort((a, b) =>
//         new Date(`1970/01/01 ${a.startTime}`) - new Date(`1970/01/01 ${b.startTime}`)
//     );


//     const calculateEventStyles = (event) => {
//         const timeToMinutes = (time) => {
//             if (!time) return 0;
//             const [hours, minutes] = time.split(':').map(Number);
//             return hours * 60 + minutes;
//         };

//         const startMinutes = timeToMinutes(event.startTime);
//         const endMinutes = timeToMinutes(event.endTime);

//         // Validate start and end times
//         if (startMinutes < 0 || startMinutes >= 1440 || endMinutes <= startMinutes) {
//             console.error(`Invalid time range for event: ${event.name}`, event);
//             return null;
//         }

//         return {
//             top: `${(startMinutes / 1440) * 100}%`,   // Removed the -2px offset
//             height: `${((endMinutes - startMinutes) / 1440) * 100}%`,
//         };
//     };

//     // columns for when there's multiple events at the same time 
//     const assignColumns = (events) => {
//         const toMinutes = (time) => {
//             const [h, m] = time.split(':').map(Number);
//             return h * 60 + m;
//         };

//         let activeEvents = [];
//         let columnCount = 0;

//         for (let i = 0; i < events.length; i++) {
//             const currentEvent = events[i];
//             const currentStart = toMinutes(currentEvent.startTime);
//             const currentEnd = toMinutes(currentEvent.endTime);

//             // Remove events from activeEvents that have ended before this event starts
//             activeEvents = activeEvents.filter(e => toMinutes(e.endTime) > currentStart);

//             // Find the lowest column index not in use
//             const usedColumns = activeEvents.map(e => e.column);
//             let colIndex = 0;
//             while (usedColumns.includes(colIndex)) {
//                 colIndex++;
//             }

//             // Assign the column index and push into activeEvents
//             currentEvent.column = colIndex;
//             activeEvents.push(currentEvent);

//             // Track the max column count encountered
//             columnCount = Math.max(columnCount, colIndex + 1);
//         }

//         events.forEach(e => {
//             e.totalColumns = columnCount;
//         });

//         return events;
//     };

//     const eventsWithColumns = assignColumns(sortedEvents);

//     eventsWithColumns.forEach(event => {
//         console.log(`Event: ${event.title}, Start: ${event.startTime}, End: ${event.endTime}, Column: ${event.column}, Total Columns: ${event.totalColumns}`);
//     });

//     // Generate hours for the day
//     const hours = Array.from({ length: 24 }, (_, i) => {
//         const hour = i % 12 || 12;
//         const ampm = i < 12 ? 'AM' : 'PM';
//         return `${hour} ${ampm}`;
//     });

//     return (
//         <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative">
//             <div className="text-2xl font-bold text-center py-4">
//                 {new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
//                     weekday: 'long',
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                 })}
//             </div>

//             <div className="flex">
//                 {/* Hours Column */}
//                 <div className="w-20 border-r relative">
//                     {hours.map((hour) => (
//                         <div
//                             key={hour}
//                             className="h-16 border-b flex items-center justify-center text-sm text-gray-500"
//                         >
//                             {hour}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Events Container */}
//                 <div className="flex-1 relative">
//                     {hours.map((hour, index) => (
//                         <div key={index} className="h-16 border-b relative"></div>
//                     ))}

//                     {eventsWithColumns.map((event, eventIndex) => {
//                         const eventStyles = calculateEventStyles(event);
//                         if (!eventStyles) return null;

//                         const widthPercent = 100 / event.totalColumns;
//                         const leftPercent = event.column * widthPercent;

//                         const isEven = eventIndex % 2 === 0;
//                         const bgColor = isEven ? 'bg-blue-100 border-blue-500' : 'bg-green-100 border-green-500';

//                         return (
//                             <div
//                                 key={eventIndex}
//                                 className={`absolute p-1.5 border-l-4 ${bgColor}`}
//                                 style={{
//                                     top: eventStyles.top,
//                                     height: eventStyles.height,
//                                     minHeight: '2rem',
//                                     left: `${leftPercent}%`,
//                                     width: `${widthPercent}%`,
//                                 }}
//                             >
//                                 <div className="font-semibold text-sm mb-1">
//                                     {event.title}
//                                 </div>

//                                 {event.location && (
//                                     <div className="text-xs text-gray-600 flex items-center mb-1">
//                                         <MapPin size={14} className="mr-1" />
//                                         {event.location}
//                                     </div>
//                                 )}

//                                 <div className="text-xs text-gray-600 flex items-center">
//                                     <Clock size={14} className="mr-1" />
//                                     {event.startTime} - {event.endTime}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DayCalendar;