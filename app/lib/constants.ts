import { Event, User, EventType } from './types';

export const USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    role: 'Chef',
  },
  {
    id: '2',
    name: 'Alice Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    role: 'Commis',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    role: 'Service',
  },
  {
    id: '4',
    name: 'Emma Davis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    role: 'Manager',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    role: 'Accueil',
  },
];

export const EVENT_TYPES: Record<EventType, { label: string; color: string }> = {
  cuisine: {
    label: 'Cuisine',
    color: 'bg-blue-500 text-white',
  },
  repos: {
    label: 'Repos Hebdomadaire',
    color: 'bg-gray-500 text-white',
  },
  commis: {
    label: 'Commis Cuisine',
    color: 'bg-teal-500 text-white',
  },
  service: {
    label: 'Service',
    color: 'bg-orange-500 text-white',
  },
  accueil: {
    label: 'Accueil',
    color: 'bg-yellow-500 text-black',
  },
  manager: {
    label: 'Manager',
    color: 'bg-red-500 text-white',
  },
};

// Helper to generate dates for the current week
const generateWeekDates = () => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(monday.getDate() - monday.getDay() + 1);
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date.toISOString().split('T')[0];
  });
};

const weekDates = generateWeekDates();

export const mockEvents: Event[] = [
  // Monday
  {
    id: '1',
    title: 'Cuisine Morning',
    type: 'cuisine',
    userId: '1',
    date: weekDates[0],
    startTime: '08:00',
    endTime: '16:00',
  },
  {
    id: '2',
    title: 'Service Evening',
    type: 'service',
    userId: '3',
    date: weekDates[0],
    startTime: '16:00',
    endTime: '23:00',
  },
  // Tuesday
  {
    id: '3',
    title: 'Commis Shift',
    type: 'commis',
    userId: '2',
    date: weekDates[1],
    startTime: '09:00',
    endTime: '17:00',
  },
  // Wednesday
  {
    id: '4',
    title: 'Manager Duty',
    type: 'manager',
    userId: '4',
    date: weekDates[2],
    startTime: '10:00',
    endTime: '18:00',
  },
  // Thursday
  {
    id: '5',
    title: 'Reception',
    type: 'accueil',
    userId: '5',
    date: weekDates[3],
    startTime: '08:00',
    endTime: '16:00',
  },
  // Friday
  {
    id: '6',
    title: 'Day Off',
    type: 'repos',
    userId: '1',
    date: weekDates[4],
    startTime: '00:00',
    endTime: '23:59',
  },
  // More events for different days and users...
];

export const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const CONTEXT_MENU_ACTIONS = [
  {
    label: 'Edit',
    icon: 'edit',
  },
  {
    label: 'Delete',
    icon: 'trash',
  },
  {
    label: 'Copy',
    icon: 'copy',
  },
  {
    label: 'Move',
    icon: 'move',
  },
] as const;

export const MODAL_TYPES = {
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  VIEW: 'view',
} as const; 