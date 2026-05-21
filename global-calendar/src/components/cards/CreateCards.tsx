"use client";

import { useState, useTransition } from "react";

import { createEventAction } from "@/app/calendar/actions";

type Participant = { id: number; name: string };

type CreateCardButtonProps = {
  participants: Participant[];
};

type EventKindOption = "private" | "shared-public" | "shared-restricted";

export default function CreateCardButton({
  participants,
}: CreateCardButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [kind, setKind] = useState<EventKindOption>("private");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function closeForm() {
    setIsFormOpen(false);
    setKind("private");
    setError(null);
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createEventAction({ error: null }, formData);
      if (result.error) {
        setError(result.error);
      } else {
        closeForm();
      }
    });
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
            action={handleSubmit}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Nouvel évènement
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
                Type
                <select
                  name="kind"
                  value={kind}
                  onChange={(event) =>
                    setKind(event.target.value as EventKindOption)
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="private">Privé</option>
                  <option value="shared-public">Partagé (public)</option>
                  <option value="shared-restricted">
                    Partagé (participants choisis)
                  </option>
                </select>
              </label>

              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Titre
                <input
                  required
                  name="title"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Réunion projet"
                />
              </label>

              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Date
                <input
                  type="date"
                  required
                  name="date"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium text-slate-700">
                  Heure début
                  <input
                    type="time"
                    name="startTime"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="grid gap-1 text-sm font-medium text-slate-700">
                  Heure fin
                  <input
                    type="time"
                    name="endTime"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>

              {kind === "shared-restricted" && (
                <label className="grid gap-1 text-sm font-medium text-slate-700">
                  Participants
                  {participants.length === 0 ? (
                    <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-500">
                      Aucun autre utilisateur enregistré pour le moment.
                    </p>
                  ) : (
                    <select
                      multiple
                      name="participants"
                      size={Math.min(participants.length, 5)}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      {participants.map((participant) => (
                        <option key={participant.id} value={participant.id}>
                          {participant.name}
                        </option>
                      ))}
                    </select>
                  )}
                </label>
              )}

              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Description
                <textarea
                  name="description"
                  className="min-h-24 resize-y rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Détails de l'évènement"
                />
              </label>
            </div>

            {error && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

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
                disabled={pending}
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Création..." : "Créer"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
