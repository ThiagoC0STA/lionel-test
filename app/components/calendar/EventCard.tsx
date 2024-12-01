'use client';

import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Event, EventDragItem } from '@/app/lib/types';
import { EVENT_TYPES, USERS } from '@/app/lib/constants';
import Image from 'next/image';
import { ContextMenu } from '../ui/ContextMenu';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuCoords, setContextMenuCoords] = useState({ x: 0, y: 0 });
  
  const [{ isDragging }, drag] = useDrag<EventDragItem, void, { isDragging: boolean }>(() => ({
    type: 'EVENT',
    item: { type: 'EVENT', event },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuCoords({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const user = USERS.find(u => u.id === event.userId);
  const eventTypeDetails = EVENT_TYPES[event.type];

  if (!eventTypeDetails) return null;

  return (
    <>
      <div
        ref={drag as unknown as React.RefObject<HTMLDivElement>}
        onContextMenu={handleContextMenu}
        className={`p-2 rounded-md cursor-move ${eventTypeDetails.color} ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          {user && (
            <div className="relative w-6 h-6 shrink-0">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="rounded-full object-cover"
                sizes="24px"
                priority
              />
            </div>
          )}
          <span className="font-medium">{event.title}</span>
        </div>
        <div className="text-sm">
          {event.startTime} - {event.endTime}
        </div>
      </div>

      {showContextMenu && (
        <ContextMenu
          x={contextMenuCoords.x}
          y={contextMenuCoords.y}
          onClose={() => setShowContextMenu(false)}
          onEdit={() => {
            onEdit(event);
            setShowContextMenu(false);
          }}
          onDelete={() => {
            onDelete(event.id);
            setShowContextMenu(false);
          }}
        />
      )}
    </>
  );
} 