import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentWeek: Date[];
  onNavigate: (direction: 'prev' | 'next') => void;
  onAddEvent: () => void;
}

export function CalendarHeader({ currentWeek, onNavigate, onAddEvent }: CalendarHeaderProps) {
  const startDate = currentWeek[0];
  const endDate = currentWeek[currentWeek.length - 1];

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate('prev')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-lg font-semibold">
          {format(startDate, 'MMMM d')} - {format(endDate, 'MMMM d, yyyy')}
        </div>
        <button
          onClick={() => onNavigate('next')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onAddEvent}
          className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
        >
          Add Event
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Publish planning
        </button>
      </div>
    </div>
  );
} 