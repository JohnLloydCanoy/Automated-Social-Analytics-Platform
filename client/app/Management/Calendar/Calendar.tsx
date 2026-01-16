"use client";
import { useState, useRef } from 'react'; 
import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import {enUS} from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import CustomEvent from './CustomEvent';
import CustomToolbar from './CustomToolbar';
import DetailDDialogs from './Components/detaild-dialogs';
import {Events} from './types';
import {getEventStyle} from './Components/socialPlatform';

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
    const [isDetailDDialogsOpen, setIsDetailDDialogsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    const clickRef = useRef({ x: 0, y: 0 });


    const [dialogPos, setDialogPos] = useState({ x: 0, y: 0 });


    const handleContainerClick = (e: React.MouseEvent) => {
        clickRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleSelectSlot = ({ start }: SlotInfo) => {
        setSelectedDate(start);
        
        setDialogPos(clickRef.current); 
        setIsDetailDDialogsOpen(true);
    };

    return (
        <div 
            className="h-[600px] bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
            onClickCapture={handleContainerClick}
        >

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
                
                eventPropGetter={getEventStyle}

                selectable
                onSelectSlot={handleSelectSlot}

                defaultView="month"
                views={['month', 'week', 'day']}
            />
            
            <DetailDDialogs 
                isOpen={isDetailDDialogsOpen} 
                onClose={() => setIsDetailDDialogsOpen(false)} 
                position={dialogPos}
            />
        </div>
    );
}