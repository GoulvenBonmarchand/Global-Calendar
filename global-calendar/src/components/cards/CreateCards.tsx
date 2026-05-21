"use client";

import { FormEvent, useState } from "react";
import type { CalendarEvent } from "@/components/cards/cards";

type CreateCardButtonProps = {
  onCreate: (event: CalendarEvent) => void;
};

type EventForm = {
  userName: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
};

const initialForm: EventForm = {
  userName: "",
  title: "",
  date: "",
  startTime: "",
  endTime: "",
  description: "",
};

export default function CreateCardButton({ onCreate }: CreateCardButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<EventForm>(initialForm);

  function updateField(field: keyof EventForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function closeForm() {
    setIsFormOpen(false);
    setForm(initialForm);
  }

  function handleCreateCard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newEvent: CalendarEvent = {
      id: Date.now(),
      userName: form.userName.trim(),
      title: form.title.trim(),
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      description: form.description.trim(),
    };

    onCreate(newEvent);
    closeForm();
  }

  return (
    <>
      <button
        onClick={() => setIsFormOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-1 active:bg-blue-800"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Nouvel évènement
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <form
            onSubmit={handleCreateCard}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Nouvel evenement
                </h2>
                <p className="text-sm text-slate-500">
                  Renseigne les informations de la carte.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Fermer"
              >
                X
              </button>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Nom utilisateur
                <input
                  required
                  value={form.userName}
                  onChange={(event) =>
                    updateField("userName", event.target.value)
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Goulven"
                />
              </label>

              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Titre
                <input
                  required
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Reunion projet"
                />
              </label>

              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Date
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(event) => updateField("date", event.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium text-slate-700">
                  Heure debut
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(event) =>
                      updateField("startTime", event.target.value)
                    }
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="grid gap-1 text-sm font-medium text-slate-700">
                  Heure fin
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(event) =>
                      updateField("endTime", event.target.value)
                    }
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>

              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Description
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  className="min-h-24 resize-y rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Details de l'evenement"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Creer
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
