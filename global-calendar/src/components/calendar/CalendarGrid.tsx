import { eventsByDay, type WeekEvent } from "@/components/calendar/ListEvents";

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

// Anchor for the displayed week — Monday = day 8 of month 4, 2026.
const FIRST_DAY = { day: 8, month: 4, year: 2026 };

export default function CalendarGrid() {
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
};

function DayColumn({ label, day, month, year }: DayColumnProps) {
  const events = eventsByDay[day] ?? [];
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2">
      <div className="flex h-20 w-full flex-col items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
        <span>{label}</span>
        <span className="mt-1 whitespace-nowrap text-xs font-medium opacity-90">
          {day} / {month} / {year}
        </span>
      </div>
      <div className="flex w-full flex-1 flex-col items-center gap-2 overflow-x-auto p-1">
        {events.map((event) => (
          <EventChip
            key={`${event.day}-${event.startHour}-${event.title}`}
            event={event}
          />
        ))}
      </div>
    </div>
  );
}

function EventChip({ event }: { event: WeekEvent }) {
  return (
    <div className="flex h-8 w-40 shrink-0 items-center justify-center rounded-md border border-blue-200 bg-blue-50 px-2 text-sm font-semibold text-blue-700">
      {event.title}
    </div>
  );
}
