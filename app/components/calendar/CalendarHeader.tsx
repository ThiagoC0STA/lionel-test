"use client";

import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Printer,
  Settings,
  Filter,
  MoreVertical,
  Wand2,
  Flame,
  Undo,
  Redo,
  Bell,
  Menu,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, useRef, useEffect } from "react";

interface CalendarHeaderProps {
  currentWeek: Date[];
  onNavigate: (direction: "prev" | "next") => void;
  onAddEvent: () => void;
}

type Tab = "overview" | "timeline" | "calendar" | "progress";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "timeline", label: "Timeline" },
  { id: "calendar", label: "Calendar" },
  { id: "progress", label: "Progress" },
];

export function CalendarHeader({
  currentWeek,
  onNavigate,
  onAddEvent,
}: CalendarHeaderProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const activeTabElement =
      tabsRef.current[tabs.findIndex((t) => t.id === activeTab)];
    if (activeTabElement) {
      setIndicatorStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab]);

  const startDate = currentWeek[0];
  const endDate = currentWeek[currentWeek.length - 1];

  return (
    <div className="border-b bg-white shadow-sm">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-4">
          {/* Planning Dropdown */}
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-orange-600" />
            </div>
            <h1 className="text-md font-semibold text-gray-900">Planning</h1>
            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center relative">
            <div className="flex items-center">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(element) => {
                    tabsRef.current[index] = element;
                  }}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-2 relative outline-none"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
            {/* Animated underline */}
            <div
              className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
            />
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            JN
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate("prev")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Previous week"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-lg font-medium text-gray-900">
              {format(startDate, "d 'de' MMMM", { locale: ptBR })} -{" "}
              {format(endDate, "d 'de' MMMM yyyy", { locale: ptBR })}
            </div>
            <button
              onClick={() => onNavigate("next")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Next week"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Right side with icons and buttons */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Filter"
            >
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <div className="h-4 w-px bg-gray-200 mx-2" /> {/* Divider */}
            <div className="flex items-center space-x-1">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Undo"
              >
                <Undo className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Redo"
              >
                <Redo className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="h-4 w-px bg-gray-200 mx-2" /> {/* Divider */}
            <div className="flex items-center space-x-1">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Magic Wand"
              >
                <Wand2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Trending"
              >
                <Flame className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="h-4 w-px bg-gray-200 mx-2" /> {/* Divider */}
            <div className="flex items-center space-x-1">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Print"
              >
                <Printer className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="More"
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onAddEvent}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Add Event
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Publish Planning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
