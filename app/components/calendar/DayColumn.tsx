import { DragItem, Event } from "../../lib/types";
import { EventCard } from "./EventCard";
import { useDrop } from "react-dnd";
import { format } from "date-fns";

interface DayColumnProps {
  date: Date;
  events: Event[];
  onEventUpdate: (event: Event) => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
  onUserDrop: (userId: string, date: Date) => void;
}

export function DayColumn({ 
  date, 
  events, 
  onEventUpdate, 
  onEditEvent, 
  onDeleteEvent,
  onUserDrop 
}: DayColumnProps) {
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(() => ({
    accept: ['EVENT', 'USER'],
    drop: (item) => {
      if (item.type === 'USER' && item.userId) {
        onUserDrop(item.userId, date);
      } else if (item.type === 'EVENT' && item.event) {
        onEventUpdate({
          ...item.event,
          date: format(date, 'yyyy-MM-dd'),
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={`min-h-[600px] p-2 border-r ${
        isOver ? "bg-blue-50" : "bg-white"
      }`}
    >
      <div className="text-sm font-medium mb-2">
        {format(date, "EEEE, MMM d")}
      </div>
      <div className="space-y-2">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={onEditEvent}
            onDelete={onDeleteEvent}
          />
        ))}
      </div>
    </div>
  );
}
