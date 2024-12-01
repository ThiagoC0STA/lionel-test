export type EventType = 'cuisine' | 'repos' | 'commis' | 'service' | 'accueil' | 'manager';

export type EventIndicatorType = 'default' | 'birthday' | 'holiday' | 'meeting' | 'deadline';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Event {
  id: string;
  title: string;
  type: EventType;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  _action?: 'create' | 'update' | 'delete';
  indicatorType?: EventIndicatorType;
}

export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface DragItem {
  type: 'EVENT' | 'USER';
  event?: Event;
  userId?: string;
}

export interface UserDragItem {
  type: 'USER';
  userId: string;
}

export interface EventDragItem {
  type: 'EVENT';
  event: Event;
} 