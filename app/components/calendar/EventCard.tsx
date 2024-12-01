'use client';

import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Event, EventDragItem } from '../../lib/types';
import { EVENT_TYPES, USERS } from '../../lib/constants';
import Image from 'next/image';
import { ContextMenu } from '../ui/ContextMenu';
import { Cake, Calendar, PartyPopper, Clock, Star } from 'lucide-react';

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

  const getIndicatorIcon = () => {
    const icons = {
      default: <Star className="w-3 h-3" />,
      birthday: <Cake className="w-3 h-3" />,
      holiday: <PartyPopper className="w-3 h-3" />,
      meeting: <Calendar className="w-3 h-3" />,
      deadline: <Clock className="w-3 h-3" />
    };
    return icons[event.indicatorType || 'default'];
  };

  if (!eventTypeDetails) return null;

  // Função para obter as cores do card baseadas no tipo de evento
  const getEventColors = () => {
    const colorMap = {
      cuisine: 'bg-blue-50 hover:bg-blue-100/80',
      repos: 'bg-gray-50 hover:bg-gray-100/80',
      commis: 'bg-teal-50 hover:bg-teal-100/80',
      service: 'bg-orange-50 hover:bg-orange-100/80',
      accueil: 'bg-yellow-50 hover:bg-yellow-100/80',
      manager: 'bg-red-50 hover:bg-red-100/80',
    };
    return colorMap[event.type] || 'bg-gray-50 hover:bg-gray-100/80';
  };

  return (
    <>
      <div
        ref={drag as unknown as React.RefObject<HTMLDivElement>}
        onContextMenu={handleContextMenu}
        className={`
          group relative p-2 rounded-lg cursor-move
          ${getEventColors()}
          transition-all duration-200
          ${isDragging ? 'opacity-50 ring-2 ring-blue-500' : ''}
        `}
      >
        {/* Top row with time and icons */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs text-gray-600">
            {event.startTime} - {event.endTime}
          </span>
          
          <div className="flex items-center gap-1.5">
            {getIndicatorIcon()}
            {user && (
              <div className="relative w-4 h-4 shrink-0">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                  sizes="16px"
                  priority
                />
              </div>
            )}
          </div>
        </div>

        {/* Event Title */}
        <div>
          <p className="text-sm text-gray-700 line-clamp-2">
            {event.title}
          </p>
        </div>

        {/* Hover Actions */}
        <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              e.preventDefault();
              onEdit(event);
            }}
            className="p-1 hover:bg-white/50 rounded-full"
          >
            <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
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