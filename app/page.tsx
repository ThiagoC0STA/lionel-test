"use client";

import { useState } from "react";
import { Event } from "./lib/types";
import { mockEvents } from "./lib/constants";
import { Calendar } from "./components/calendar/Calendar";

export default function Home() {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const handleEventUpdate = (updatedEvent: Event & { _action?: 'create' | 'update' | 'delete' }) => {
    const { _action, ...eventData } = updatedEvent;

    setEvents(prev => {
      switch (_action) {
        case 'create':
          return [...prev, eventData];
        case 'update':
          return prev.map(event => 
            event.id === eventData.id ? eventData : event
          );
        case 'delete':
          return prev.filter(event => event.id !== eventData.id);
        default:
          // Para drag and drop e outras atualizações
          return prev.map(event => 
            event.id === eventData.id ? eventData : event
          );
      }
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-4">
        <Calendar events={events} onEventUpdate={handleEventUpdate} />
      </div>
    </main>
  );
}
