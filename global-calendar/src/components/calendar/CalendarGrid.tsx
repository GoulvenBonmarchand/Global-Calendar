"use client";

import { useState, useEffect } from "react";
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

const START_HOUR = 6;
const END_HOUR = 24;
const HOUR_HEIGHT = 44;
const HOURS = Array.from(
  { length: END_HOUR - START_HOUR },
  (_, i) => START_HOUR + i,
);

type CalendarGridProps = {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  weekStart: Date;
};

export default function CalendarGrid({
    events,
    onSelectEvent,
    weekStart,
}: CalendarGridProps) {
    const [couleurPreferee, setCouleurPreferee] = useState("#72a1ec");

useEffect(() => {
    const couleurSauvegardee = localStorage.getItem("user_pref_color");
    if (couleurSauvegardee) {
      setCouleurPreferee(couleurSauvegardee);
    }
    }, []);
    return (
    <div className="grid grid-cols-8 gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-3">
      <TimeColumn couleur={couleurPreferee} />
      {DAYS.map((label, index) => {
        const date = addDays(weekStart, index);
        return (
          <DayColumn
            key={label}
            label={label}
            day={date.getDate()}
            month={date.getMonth() + 1}
            year={date.getFullYear()}
            events={events}
            onSelectEvent={onSelectEvent}
            couleur={couleurPreferee}
          />
        );
      })}
    </div>
  );
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function TimeColumn({ couleur }: { couleur: string }) {
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2">
      {/* 🛠️ On injecte la couleur dynamique sur le fond ici */}
      <div 
        style={{ backgroundColor: couleur }}
        className="flex h-20 w-full shrink-0 items-center justify-center rounded-lg font-bold text-white"
      >
        Heure
      </div>
      <div className="flex w-full flex-col p-1">
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="flex w-full shrink-0 items-start justify-center border-t border-slate-200 pt-1 text-sm font-medium text-slate-700 first:border-t-0"
            style={{ height: HOUR_HEIGHT }}
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
  couleur: string;
};

function DayColumn({
  label,
  day,
  month,
  year,
  events,
  onSelectEvent,
  couleur,
}: DayColumnProps) {
  const dayEvents = events.filter((event) =>
    isEventOnDay(event, day, month, year),
  );

  return (
    <div className="flex h-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2">
      <div 
        style={{ backgroundColor: couleur }}
        className="flex h-20 w-full flex-col items-center justify-center rounded-lg font-bold text-white"
      >
        <span>{label}</span>
        <span className="mt-1 whitespace-nowrap text-xs font-medium opacity-90">
          {day} / {month} / {year}
        </span>
      </div>
      <div
        className="relative w-full p-1"
        style={{ height: HOURS.length * HOUR_HEIGHT }}
      >
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="border-t border-slate-100 first:border-t-0"
            style={{ height: HOUR_HEIGHT }}
          />
        ))}

        {dayEvents.map((event) => (
          <EventChip
            couleur={couleur}
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
  couleur: string;
};

function EventChip({ event, onSelectEvent, couleur }: EventChipProps) {
  const position = getEventPosition(event);

  return (
    <button
      type="button"
      onClick={() => onSelectEvent(event)}
      className="absolute left-1 right-1 flex min-h-8 flex-col items-start justify-center overflow-hidden rounded-md border bg-white px-2 text-left text-sm font-semibold shadow-sm transition opacity-90 hover:opacity-100"
      style={{
        top: position.top,
        height: position.height,
        borderColor: couleur,
        color: couleur,
      }}
    >
      <span className="w-full truncate">{event.title}</span>
      {(event.startTime || event.endTime) && (
        <span style={{ color: couleur }} className="w-full truncate text-xs font-medium opacity-80">
          {event.startTime} {event.endTime && `- ${event.endTime}`}
        </span>
      )}
    </button>
  );
}

function getEventPosition(event: CalendarEvent) {
  const startMinutes = parseTimeToMinutes(event.startTime) ?? START_HOUR * 60;
  const endMinutes =
    parseTimeToMinutes(event.endTime) ?? Math.min(startMinutes + 60, END_HOUR * 60);
  const calendarStart = START_HOUR * 60;
  const calendarEnd = END_HOUR * 60;
  const clampedStart = Math.max(startMinutes, calendarStart);
  const clampedEnd = Math.min(Math.max(endMinutes, clampedStart + 30), calendarEnd);

  return {
    top: ((clampedStart - calendarStart) / 60) * HOUR_HEIGHT,
    height: ((clampedEnd - clampedStart) / 60) * HOUR_HEIGHT,
  };
}

function parseTimeToMinutes(time?: string) {
  if (!time) {
    return null;
  }

  const timeParts = time.match(/^(\d{1,2}):(\d{2})$/);

  if (!timeParts) {
    return null;
  }

  return Number(timeParts[1]) * 60 + Number(timeParts[2]);
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
