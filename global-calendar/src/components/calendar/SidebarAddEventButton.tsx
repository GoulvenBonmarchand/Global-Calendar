"use client";

import type { CalendarEvent } from "@/components/cards/cards";

export default function SidebarAddEventButton() {
  function handleClick() {
    const newEvent: CalendarEvent = {
      id: Date.now(),
      title: "Nouvel évènement",
      date: "Aujourd'hui",
      startTime: "10:00",
      endTime: "11:00",
      description: "Description du nouvel événement.",
    };

    console.log("New event from sidebar:", newEvent);
  }

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
    >
      <span aria-hidden="true" className="text-base leading-none">
        +
      </span>
      Nouvel évènement
    </button>
  );
}
