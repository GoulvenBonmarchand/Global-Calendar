"use client";

import type { CalendarEvent } from "@/components/cards/cards";

const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;

const HOURS = Array.from({ length: 24 - 6 + 1 }, (_, i) => 6 + i);

// Anchor for the displayed week. Monday = May 18, 2026.
const FIRST_DAY = { day: 18, month: 5, year: 2026 };

type CalendarGridProps = {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
};

export default function CalendarGrid({
  events,
  onSelectEvent,
}: CalendarGridProps) {
  return (
    <div className="grid grid-cols-8 gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-3">
      <TimeColumn />
      {DAYS.map((label, index) => (
        <DayColumn
          key={label}
          label={label}
          day={FIRST_DAY.day + index}
          month={FIRST_DAY.month}
          year={FIRST_DAY.year}
          events={events}
          onSelectEvent={onSelectEvent}
        />
      ))}
    </div>
  );
}

function TimeColumn() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2">
      <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
        Heure
      </div>
      <div className="flex w-full flex-1 flex-col items-center gap-2 overflow-y-auto p-1">
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="flex h-8 w-full shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700"
          >
            {hour}:00
          </div>
        ))}
      </div>
    </div>
  );
}

type DayColumnProps = {
  label: string;
  day: number;
  month: number;
  year: number;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
};

function DayColumn({
  label,
  day,
  month,
  year,
  events,
  onSelectEvent,
}: DayColumnProps) {
  const dayEvents = events.filter((event) =>
    isEventOnDay(event, day, month, year),
  );

  return (
    <div className="flex h-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2">
      <div className="flex h-20 w-full flex-col items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
        <span>{label}</span>
        <span className="mt-1 whitespace-nowrap text-xs font-medium opacity-90">
          {day} / {month} / {year}
        </span>
      </div>
      <div className="flex w-full flex-1 flex-col items-center gap-2 overflow-x-auto p-1">
        {dayEvents.map((event) => (
          <EventChip
            key={event.id}
            event={event}
            onSelectEvent={onSelectEvent}
          />
        ))}
      </div>
    </div>
  );
}

type EventChipProps = {
  event: CalendarEvent;
  onSelectEvent: (event: CalendarEvent) => void;
};

function EventChip({ event, onSelectEvent }: EventChipProps) {
  return (
    <button
      type="button"
      onClick={() => onSelectEvent(event)}
      className="flex h-12 w-40 shrink-0 flex-col items-start justify-center rounded-md border border-blue-200 bg-blue-50 px-2 text-left text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
    >
      <span className="w-full truncate">{event.title}</span>
      {(event.startTime || event.endTime) && (
        <span className="w-full truncate text-xs font-medium text-blue-600">
          {event.startTime} {event.endTime && `- ${event.endTime}`}
        </span>
      )}
    </button>
  );
}

function isEventOnDay(
  event: CalendarEvent,
  day: number,
  month: number,
  year: number,
) {
  const eventDate = parseEventDate(event.date);

  return (
    eventDate?.day === day &&
    eventDate.month === month &&
    eventDate.year === year
  );
}

function parseEventDate(date?: string) {
  if (!date) {
    return null;
  }

  const isoDate = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (isoDate) {
    return {
      day: Number(isoDate[3]),
      month: Number(isoDate[2]),
      year: Number(isoDate[1]),
    };
  }

  const frenchMonths: Record<string, number> = {
    janvier: 1,
    fevrier: 2,
    mars: 3,
    avril: 4,
    mai: 5,
    juin: 6,
    juillet: 7,
    aout: 8,
    septembre: 9,
    octobre: 10,
    novembre: 11,
    decembre: 12,
  };
  const frenchDate = date
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .match(/^(\d{1,2}) ([a-z]+) (\d{4})$/);

  if (!frenchDate) {
    return null;
  }

  const parsedMonth = frenchMonths[frenchDate[2]];

  if (!parsedMonth) {
    return null;
  }

  return {
    day: Number(frenchDate[1]),
    month: parsedMonth,
    year: Number(frenchDate[3]),
  };
}
