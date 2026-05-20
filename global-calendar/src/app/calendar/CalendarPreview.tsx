"use client";

import { useState } from "react";
import Cards from "@/components/cards/cards";
import type { CalendarEvent } from "@/components/cards/cards";
import { events } from "@/data/events";
import CreateCardButton from "@/components/cards/CreateCards";

export default function CalendarPreview() {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  function handleCreateEvent(newEvent: CalendarEvent) {
    setAllEvents([...allEvents, newEvent]);
    setSelectedEvent(newEvent);
  }

  return (
    <section className="p-6">
      <CreateCardButton onCreate={handleCreateEvent} />

      <div className="mt-6 grid gap-4">
        {allEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow hover:bg-slate-50"
          >
            <h3 className="font-semibold text-slate-900">{event.title}</h3>
            <p className="text-sm text-slate-500">{event.date}</p>
          </button>
        ))}
      </div>

      {selectedEvent && (
        <Cards
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}