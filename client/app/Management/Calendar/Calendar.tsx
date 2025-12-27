"use client";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Import your custom parts
import CustomEvent from './CustomEvent';
import CustomToolbar from './CustomToolbar';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// Dummy Data with a "platform" field
const myEvents = [
    { 
        title: "Launch Project ASAP", 
        platform: "Facebook",
        start: new Date(2025, 11, 28, 10, 0), // Dec 28, 10:00 AM
        end: new Date(2025, 11, 28, 12, 0),
        time: "10:00 AM"
    },
    { 
        title: "Tweet about AI", 
        platform: "Twitter",
        start: new Date(2025, 11, 29, 14, 0), 
        end: new Date(2025, 11, 29, 15, 0),
        time: "2:00 PM"
    },
];

export default function MyCustomCalendar() {
    return (
        <div className="h-[600px] bg-white p-2">
        {/* CSS Override for the calendar grid */}
        <style>{`
            .rbc-calendar { font-family: inherit; }
            .rbc-event { background-color: transparent; padding: 0; }
            .rbc-today { background-color: #eff6ff; } /* Light blue today */
        `}</style>

        <Calendar
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            
            // THIS IS THE MAGIC PART
            components={{
                event: CustomEvent,   
                toolbar: CustomToolbar 
            }}
            
            views={['month', 'week', 'day']}
            defaultView="month"
        />
        </div>
    );
}