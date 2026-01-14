"use client";
import { useState } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomEvent from './CustomEvent';
import CustomToolbar from './CustomToolbar';
import DetailDDialogs from './Components/detaild-dialogs';


const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const today = new Date();
const initialEvents = [
    { 
        id: 1,
        title: "Teaser Video", 
        platform: "Instagram",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
        time: "10:00 AM"
    },
    { 
        id: 2,
        title: "Official Announcement", 
        platform: "Facebook",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0), 
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 15, 0),
        time: "2:00 PM"
    },
    { 
        id: 3,
        title: "Tech Thread", 
        platform: "Twitter",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 9, 0), 
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0),
        time: "9:00 AM"
    },
];

export default function CalendarSegment() {
    const [events, setEvents] = useState(initialEvents);

    const openDetailDDialogs = () => {
        if (typeof window !== 'undefined') {
            const event = new CustomEvent('openDetailDDialogs');
            window.dispatchEvent(event);
        }
    };


    const eventStyleGetter = (event: any) => {
        let backgroundColor = '#3b82f6'; // Default Blue
        let borderLeft = '4px solid #1d4ed8';

        switch (event.platform?.toLowerCase()) {
            case 'facebook':
                backgroundColor = '#eff6ff'; // Light Blue bg
                borderLeft = '4px solid #1877F2'; // Facebook Blue
                break;
            case 'instagram':
                backgroundColor = '#fdf2f8'; // Light Pink bg
                borderLeft = '4px solid #E1306C'; // Insta Pink
                break;
            case 'twitter':
                backgroundColor = '#f0f9ff'; // Light Sky bg
                borderLeft = '4px solid #1DA1F2'; // Twitter Blue
                break;
            case 'linkedin':
                backgroundColor = '#eff6ff';
                borderLeft = '4px solid #0a66c2';
                break;
        }

        return {
            style: {
                backgroundColor: backgroundColor,
                border: 'none',
                borderLeft: borderLeft,
                borderRadius: '4px',
                color: '#1f2937', // Dark gray text
                display: 'block',
                opacity: 0.9
            }
        };
    };


    const handleSelectSlot = ({ start, end }: SlotInfo) => {
        // Opens on detail dialog Dialogs
        openDetailDDialogs();
        
    };

    return (
        <div className="h-[600px] bg-white p-4 rounded-2xl shadow-sm border border-gray-100">

            <style>{`
                .rbc-calendar { font-family: inherit; }
                .rbc-today { background-color: #f8fafc !important; }
                .rbc-event { padding: 0 !important; background: transparent; }
                .rbc-header { padding: 10px 0; font-size: 0.875rem; font-weight: 600; color: #64748b; }
                .rbc-off-range-bg { background-color: #f1f5f9; }
            `}</style>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 550 }}
                

                components={{
                    event: CustomEvent,   
                    toolbar: CustomToolbar 
                }}
                
                eventPropGetter={eventStyleGetter}

                selectable
                onSelectSlot={handleSelectSlot}

                defaultView="month"
                views={['month', 'week', 'day']}
            />
        </div>
    );
}