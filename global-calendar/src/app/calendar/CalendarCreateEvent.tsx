"use client";

import { useState } from "react";
import Cards from "@/components/cards/cards";
import type { CalendarEvent } from "@/components/cards/cards";
import CreateCardButton from "@/components/cards/CreateCards";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import { events } from "@/data/events";

export default function CalendarCreateEvent() {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  function handleCreateEvent(event: CalendarEvent) {
    setAllEvents((currentEvents) => [...currentEvents, event]);
    setSelectedEvent(event);
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <CreateCardButton onCreate={handleCreateEvent} />
      </div>

      <CalendarGrid events={allEvents} onSelectEvent={setSelectedEvent} />

      {selectedEvent && (
        <Cards event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}
