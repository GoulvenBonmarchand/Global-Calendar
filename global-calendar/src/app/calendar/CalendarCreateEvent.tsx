"use client";

import { useState, useTransition } from "react";

import Cards from "@/components/cards/cards";
import type { CalendarEvent } from "@/components/cards/cards";
import CreateCardButton from "@/components/cards/CreateCards";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import { deleteEventAction } from "@/app/calendar/actions";

// On choisit comme semaine de départ la semaine de création du projet: Monday, May 18, 2026.
// On vera plus tard si on peut avoir comme semaine par défaut la semaine courante.
const DEFAULT_WEEK_START = new Date(2026, 4, 18);

type Participant = { id: number; name: string };

type CalendarCreateEventProps = {
  events: CalendarEvent[];
  participants: Participant[];
};

export default function CalendarCreateEvent({
  events,
  participants,
}: CalendarCreateEventProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [weekStart, setWeekStart] = useState<Date>(DEFAULT_WEEK_START);
  const [, startTransition] = useTransition();

  function handleDeleteEvent(event: CalendarEvent) {
    startTransition(async () => {
      await deleteEventAction(event.id, event.kind);
    });
    setSelectedEvent(null);
  }

  function shiftWeek(days: number) {
    setWeekStart((current) => {
      const next = new Date(current);
      next.setDate(next.getDate() + days);
      return next;
    });
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => shiftWeek(-7)}
            aria-label="Semaine précédente"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-1 active:bg-slate-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => shiftWeek(7)}
            aria-label="Semaine suivante"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-1 active:bg-slate-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <CreateCardButton participants={participants} />
      </div>

      <CalendarGrid
        events={events}
        onSelectEvent={setSelectedEvent}
        weekStart={weekStart}
      />

      {selectedEvent && (
        <Cards
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onDelete={handleDeleteEvent}
        />
      )}
    </>
  );
}
