'use client';

import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Event, EventType } from '../../lib/types';
import { useContextMenu } from '@/app/hooks/useContextMenu';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: event,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  const { showMenu } = useContextMenu();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    showMenu(e, [
      {
        label: 'Edit',
        onClick: () => onEdit(event),
      },
      {
        label: 'Delete',
        onClick: () => onDelete(event.id),
      },
    ]);
  };

  return (
    <div
      ref={ref}
      onContextMenu={handleContextMenu}
      className={`
        p-2 rounded-md mb-2 cursor-move
        ${getEventTypeColor(event.type)}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <h3 className="text-sm font-medium">{event.title}</h3>
      <p className="text-xs">
        {event.startTime} - {event.endTime}
      </p>
    </div>
  );
}

function getEventTypeColor(type: EventType): string {
  const colors = {
    cuisine: 'bg-blue-500 text-white',
    repos: 'bg-gray-500 text-white',
    commis: 'bg-teal-500 text-white',
    service: 'bg-orange-500 text-white',
    accueil: 'bg-yellow-500 text-black',
    manager: 'bg-red-500 text-white',
  };
  return colors[type] || 'bg-gray-200';
} 