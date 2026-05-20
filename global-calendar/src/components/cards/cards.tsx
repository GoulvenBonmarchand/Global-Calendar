"use client";

export type CalendarEvent = {
  id: number;
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
};

type CardsProps = {
  event: CalendarEvent;
  onClose: () => void;
};

export default function Cards({ event, onClose }: CardsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Fermer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-slate-900">{event.title}</h2>

        {event.date && (
          <p className="mt-2 text-sm text-slate-500">{event.date}</p>
        )}

        {(event.startTime || event.endTime) && (
          <p className="mt-1 text-sm text-slate-500">
            {event.startTime} {event.endTime && `- ${event.endTime}`}
          </p>
        )}

        {event.description && (
          <p className="mt-4 text-slate-700">{event.description}</p>
        )}
      </div>
    </div>
  );
}