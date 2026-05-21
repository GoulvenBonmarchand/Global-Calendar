"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import {
  createPrivateEvent,
  createSharedEvent,
  deleteEvent,
  type EventKind,
  type SharedVisibility,
} from "@/lib/events-repo";

type CreateEventState = { error: string | null };

export async function createEventAction(
  _previous: CreateEventState,
  formData: FormData,
): Promise<CreateEventState> {
  const session = await auth();
  const userId = session?.user?.id ? Number(session.user.id) : null;

  if (!userId) {
    return { error: "Session expirée. Reconnecte-toi." };
  }

  const titre = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const startTime = String(formData.get("startTime") ?? "").trim();
  const endTime = String(formData.get("endTime") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const kind = String(formData.get("kind") ?? "private");

  if (!titre || !date) {
    return { error: "Le titre et la date sont obligatoires." };
  }

  const input = {
    titre,
    date,
    startTime: startTime || undefined,
    endTime: endTime || undefined,
    description: description || undefined,
  };

  if (kind === "private") {
    createPrivateEvent(userId, input);
  } else if (kind === "shared-public" || kind === "shared-restricted") {
    const visibility: SharedVisibility =
      kind === "shared-public" ? "public" : "private";
    const participantIds = formData
      .getAll("participants")
      .map((value) => Number(value))
      .filter((value) => Number.isInteger(value) && value > 0);

    if (visibility === "private" && participantIds.length === 0) {
      return { error: "Sélectionne au moins un participant." };
    }

    createSharedEvent(userId, input, visibility, participantIds);
  } else {
    return { error: "Type d'évènement invalide." };
  }

  revalidatePath("/calendar");
  return { error: null };
}

export async function deleteEventAction(eventId: number, kind: EventKind) {
  const session = await auth();
  const userId = session?.user?.id ? Number(session.user.id) : null;

  if (!userId) {
    return;
  }

  deleteEvent(eventId, kind, userId);
  revalidatePath("/calendar");
}
