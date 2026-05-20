"use client";

import { useState } from "react";
import Cards, { CalendarEvent } from "@/components/cards/cards";
import { events } from "@/data/events";

export default function CalendarPreview() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    events[0]
  );

  return (
    <>
      {selectedEvent && (
        <Cards
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}