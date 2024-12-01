"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Event, EventType } from "@/app/lib/types";
import { EVENT_TYPES, USERS } from "@/app/lib/constants";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event;
  onSave: (event: Event) => void;
  type: "create" | "edit";
  defaultDate?: Date;
  defaultUserId?: string;
}

const getInitialFormData = (
  type: "create" | "edit",
  event?: Event,
  defaultDate?: Date,
  defaultUserId?: string
): Partial<Event> => {
  if (type === "edit" && event) {
    return { ...event };
  }

  const currentDate = defaultDate
    ? format(defaultDate, "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd");

  return {
    title: "",
    type: "cuisine" as EventType,
    userId: defaultUserId || "",
    startTime: "09:00",
    endTime: "17:00",
    date: currentDate,
  };
};

export function Modal({
  isOpen,
  onClose,
  event,
  onSave,
  type,
  defaultDate,
  defaultUserId,
}: ModalProps) {
  const [formData, setFormData] = useState<Partial<Event>>(() =>
    getInitialFormData(type, event, defaultDate, defaultUserId)
  );

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData(type, event, defaultDate, defaultUserId));
    }
  }, [isOpen, type, event, defaultDate, defaultUserId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: event?.id || Math.random().toString(36).substr(2, 9),
      ...formData,
    } as Event);
    onClose();
  };

  const selectedUser = USERS.find((user) => user.id === formData.userId);
  const eventTypeDetails = EVENT_TYPES[formData.type as EventType];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-[500px] shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-semibold">
              {type === "create" ? "Create New Event" : "Edit Event"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as EventType,
                      })
                    }
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  >
                    {Object.entries(EVENT_TYPES).map(([value, { label }]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">
                  Assign to
                </label>
                <div className="relative">
                  <select
                    value={formData.userId}
                    onChange={(e) =>
                      setFormData({ ...formData, userId: e.target.value })
                    }
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  >
                    <option value="">Select team member</option>
                    {USERS.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {formData.title && formData.type && formData.userId && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Preview
                </h4>
                <div className={`p-3 rounded-md ${eventTypeDetails?.color}`}>
                  <div className="flex items-center gap-3 mb-2">
                    {selectedUser && (
                      <div className="relative w-6 h-6 shrink-0">
                        <Image
                          src={selectedUser.avatar}
                          alt={selectedUser.name}
                          fill
                          className="rounded-full object-cover"
                          sizes="24px"
                          priority
                        />
                      </div>
                    )}
                    <span className="font-medium">{formData.title}</span>
                  </div>
                  <div className="text-sm">
                    {formData.startTime} - {formData.endTime}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {type === "create" ? "Create Event" : "Save Changes"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
