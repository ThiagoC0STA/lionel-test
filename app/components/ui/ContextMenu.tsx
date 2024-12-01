'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContextMenu({ x, y, onClose, onEdit, onDelete }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg py-1 w-48 border z-50"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        transform: `translate(${x + 240 > window.innerWidth ? -100 : 0}%, ${
          y + 96 > window.innerHeight ? -100 : 0
        }%)`
      }}
    >
      <button
        onClick={onEdit}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
      >
        Edit Event
      </button>
      <button
        onClick={onDelete}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 text-sm"
      >
        Delete Event
      </button>
    </div>,
    document.body
  );
} 