"use client";

import type { CalendarEvent } from "@/components/cards/cards";

type CreateCardButtonProps = {
  onCreate: (event: CalendarEvent) => void;
};

export default function CreateCardButton({ onCreate }: CreateCardButtonProps) {
  function handleCreateCard() {
    const newEvent: CalendarEvent = {
      id: Date.now(),
      title: "Nouvel événement",
      date: "Aujourd'hui",
      startTime: "10:00",
      endTime: "11:00",
      description: "Description du nouvel événement.",
    };

    onCreate(newEvent);
  }

  return (
    <button
      onClick={handleCreateCard}
      className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700"
    >
      + Créer une carte
    </button>
  );
}