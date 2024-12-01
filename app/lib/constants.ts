import { Event, EventType, User } from "./types";

export const USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    role: "Chef",
  },
  {
    id: "2",
    name: "Alice Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    role: "Commis",
  },
  {
    id: "3",
    name: "Bob Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    role: "Service",
  },
  {
    id: "4",
    name: "Emma Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    role: "Manager",
  },
  {
    id: "5",
    name: "Michael Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    role: "Accueil",
  },
  {
    id: "6",
    name: "Michele Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
    role: "Accueil",
  },
];

export const EVENT_TYPES: Record<EventType, { label: string; color: string }> =
  {
    cuisine: {
      label: "Cuisine",
      color: "bg-blue-500 text-white",
    },
    repos: {
      label: "Repos Hebdomadaire",
      color: "bg-gray-500 text-white",
    },
    commis: {
      label: "Commis Cuisine",
      color: "bg-teal-500 text-white",
    },
    service: {
      label: "Service",
      color: "bg-orange-500 text-white",
    },
    accueil: {
      label: "Accueil",
      color: "bg-yellow-500 text-black",
    },
    manager: {
      label: "Manager",
      color: "bg-red-500 text-white",
    },
  };

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Cuisine Morning",
    type: "cuisine",
    userId: "1",
    date: "2024-11-25",
    startTime: "08:00",
    endTime: "16:00",
  },
  {
    id: "2",
    title: "Service Evening",
    type: "service",
    userId: "3",
    date: "2024-11-25",
    startTime: "16:00",
    endTime: "23:00",
  },
  // Terça (26/11)
  {
    id: "3",
    title: "Commis Shift",
    type: "commis",
    userId: "2",
    date: "2024-11-26",
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    id: "7",
    title: "Evening Reception",
    type: "accueil",
    userId: "5",
    date: "2024-11-26",
    startTime: "15:00",
    endTime: "23:00",
  },
  // Quarta (27/11)
  {
    id: "4",
    title: "Manager Duty",
    type: "manager",
    userId: "4",
    date: "2024-11-27",
    startTime: "10:00",
    endTime: "18:00",
  },
  {
    id: "8",
    title: "Kitchen Late",
    type: "cuisine",
    userId: "1",
    date: "2024-11-27",
    startTime: "14:00",
    endTime: "22:00",
  },
  // Quinta (28/11)
  {
    id: "5",
    title: "Reception",
    type: "accueil",
    userId: "5",
    date: "2024-11-28",
    startTime: "08:00",
    endTime: "16:00",
  },
  {
    id: "9",
    title: "Service Evening",
    type: "service",
    userId: "3",
    date: "2024-11-28",
    startTime: "16:00",
    endTime: "23:00",
  },
  // Sexta (29/11)
  {
    id: "6",
    title: "Day Off",
    type: "repos",
    userId: "1",
    date: "2024-11-29",
    startTime: "00:00",
    endTime: "23:59",
  },
  {
    id: "10",
    title: "Commis Morning",
    type: "commis",
    userId: "2",
    date: "2024-11-29",
    startTime: "07:00",
    endTime: "15:00",
  },
  // Sábado (30/11)
  {
    id: "11",
    title: "Weekend Service",
    type: "service",
    userId: "3",
    date: "2024-11-30",
    startTime: "12:00",
    endTime: "20:00",
  },
  {
    id: "12",
    title: "Manager Weekend",
    type: "manager",
    userId: "4",
    date: "2024-11-30",
    startTime: "09:00",
    endTime: "17:00",
  },
  // Domingo (01/12)
  {
    id: "13",
    title: "Weekend Reception",
    type: "accueil",
    userId: "5",
    date: "2024-12-01",
    startTime: "10:00",
    endTime: "18:00",
  },
];

export const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const CONTEXT_MENU_ACTIONS = [
  {
    label: "Edit",
    icon: "edit",
  },
  {
    label: "Delete",
    icon: "trash",
  },
  {
    label: "Copy",
    icon: "copy",
  },
  {
    label: "Move",
    icon: "move",
  },
] as const;

export const MODAL_TYPES = {
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
  VIEW: "view",
} as const;
