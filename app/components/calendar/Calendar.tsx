'use client';

import { useCalendar } from "../../hooks/useCalendar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Event } from "../../lib/types";
import { CalendarHeader } from "./CalendarHeader";
import { Sidebar } from "./Sidebar";
import { DayColumn } from "./DayColumn";
import { Modal } from "../ui/Modal";
import { useState } from "react";
import { format } from "date-fns";

interface CalendarProps {
  events: Event[];
  onEventUpdate: (event: Event) => void;
}

export function Calendar({ events, onEventUpdate }: CalendarProps) {
  const { currentWeek, navigateWeek, users } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [defaultDate, setDefaultDate] = useState<Date | undefined>();
  const [defaultUserId, setDefaultUserId] = useState<string | undefined>();

  const handleAddEvent = (date?: Date, userId?: string) => {
    setModalType('create');
    setSelectedEvent(undefined);
    setDefaultDate(date || undefined);
    setDefaultUserId(userId || '');
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setModalType('edit');
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = events.find(event => event.id === eventId);
    if (eventToDelete) {
      onEventUpdate({ ...eventToDelete, _action: 'delete' });
    }
  };

  const handleSaveEvent = (event: Event) => {
    if (modalType === 'create') {
      const newEvent = {
        ...event,
        id: Math.random().toString(36).substr(2, 9),
        _action: 'create' as const,
      };
      onEventUpdate(newEvent);
    } else {
      onEventUpdate({ ...event, _action: 'update' as const });
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(undefined);
    setDefaultDate(undefined);
    setDefaultUserId(undefined);
    setModalType('create');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full">
        <CalendarHeader 
          currentWeek={currentWeek}
          onNavigate={navigateWeek}
          onAddEvent={() => handleAddEvent()}
        />
        <div className="flex">
          <Sidebar users={users} />
          <div className="flex-1 grid grid-cols-7">
            {currentWeek.map((date) => (
              <DayColumn
                key={date.toString()}
                date={date}
                events={events.filter(e => e.date === format(date, 'yyyy-MM-dd'))}
                onEventUpdate={onEventUpdate}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                onUserDrop={(userId) => handleAddEvent(date, userId)}
              />
            ))}
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={selectedEvent}
          onSave={handleSaveEvent}
          type={modalType}
          defaultDate={defaultDate}
          defaultUserId={defaultUserId}
        />
      </div>
    </DndProvider>
  );
}