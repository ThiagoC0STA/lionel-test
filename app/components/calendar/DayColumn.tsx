import { DragItem, Event, EventIndicatorType } from "../../lib/types";
import { EventCard } from "./EventCard";
import { useDrop } from "react-dnd";
import { format, isToday } from "date-fns";
import { Cake, Calendar, PartyPopper, Clock } from "lucide-react";
import type { Ref } from "react";

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
  onUserDrop,
}: DayColumnProps) {
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(
    () => ({
      accept: ["EVENT", "USER"],
      drop: (item) => {
        if (item.type === "USER" && item.userId) {
          onUserDrop(item.userId, date);
        } else if (item.type === "EVENT" && item.event) {
          onEventUpdate({
            ...item.event,
            date: format(date, "yyyy-MM-dd"),
          });
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    })
  );

  const isCurrentDay = isToday(date);

  const getIndicatorIcon = (type: EventIndicatorType | undefined) => {
    if (!type || type === 'default') return null;
    
    const icons: Record<Exclude<EventIndicatorType, 'default'>, JSX.Element> = {
      birthday: (
        <Cake className="w-5 h-5 text-white bg-pink-500 rounded-full p-1" />
      ),
      holiday: (
        <PartyPopper className="w-5 h-5 text-white bg-green-500 rounded-full p-1" />
      ),
      meeting: (
        <Calendar className="w-5 h-5 text-white bg-purple-500 rounded-full p-1" />
      ),
      deadline: (
        <Clock className="w-5 h-5 text-white bg-red-500 rounded-full p-1" />
      ),
    };
    return icons[type];
  };

  return (
    <div
      ref={drop as unknown as Ref<HTMLDivElement>}
      className={`
        relative min-h-[600px] w-full border-r
        transition-all duration-200 ease-in-out
        ${isOver ? "bg-blue-50/60 ring-1 ring-blue-200 ring-inset" : ""}
        ${isCurrentDay ? "bg-blue-50/20" : ""}
      `}
    >
      <div
        className={`
        sticky top-0 z-[1]
        px-3 py-2.5
        border-b bg-white/95 backdrop-blur-sm
        min-h-[80px]
        flex flex-col justify-start items-center
      `}
      >
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-sm font-medium text-gray-400">
            {format(date, "MMM")}
          </span>
          <span
            className={`
            ${
              isCurrentDay
                ? "w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full"
                : "text-gray-900"
            } text-lg font-semibold
          `}
          >
            {format(date, "d")}
          </span>
          <span className="text-sm font-medium text-gray-400">
            {format(date, "yyyy")}
          </span>
        </div>

        {events.length > 0 && (
          <div className="w-full flex items-center justify-center gap-2 mt-2 px-2">
            {events
              .map(event => event.indicatorType)
              .filter((type): type is Exclude<EventIndicatorType, 'default'> => 
                type !== undefined && type !== 'default' && !!getIndicatorIcon(type)
              )
              .filter((type, index, array) => 
                array.indexOf(type) === index
              )
              .length > 0 && (
                <div className="flex items-center gap-2">
                  {events
                    .map(event => event.indicatorType)
                    .filter((type): type is Exclude<EventIndicatorType, 'default'> => 
                      type !== undefined && type !== 'default' && !!getIndicatorIcon(type)
                    )
                    .filter((type, index, array) => 
                      array.indexOf(type) === index
                    )
                    .map((type) => (
                      <div
                        key={type}
                        className="transition-transform hover:scale-110"
                        title={type.charAt(0).toUpperCase() + type.slice(1)}
                      >
                        {getIndicatorIcon(type)}
                      </div>
                    ))}
                </div>
            )}
            <div className="w-5 h-5 text-xs flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-medium ml-auto">
              {events.length}
            </div>
          </div>
        )}
      </div>

      <div
        className={`
        p-2 space-y-2
        ${isOver ? "bg-blue-50/40" : ""}
        transition-all duration-200
      `}
      >
        {events.length === 0 ? (
          <div
            className={`
            flex flex-col items-center justify-center 
            h-20 rounded-lg border-2 border-dashed
            ${
              isOver
                ? "border-blue-300 bg-blue-50/50"
                : "border-gray-200 bg-gray-50/50"
            }
          `}
          >
            <p
              className={`text-sm text-center ${
                isOver ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Drop a Team Member here
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={onEditEvent}
                onDelete={onDeleteEvent}
              />
            ))}
          </div>
        )}
      </div>

      {isOver && (
        <div className="absolute inset-0 border-2 border-blue-300 border-dashed rounded-lg pointer-events-none" />
      )}
    </div>
  );
}
