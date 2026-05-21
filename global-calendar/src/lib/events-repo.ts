import "server-only";

import { db } from "@/lib/db";
import type { CalendarEvent } from "@/components/cards/cards";

export type EventKind = "private" | "shared";
export type SharedVisibility = "public" | "private";

type PrivateRow = {
  id: number;
  titre: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  description: string | null;
  creator_name: string;
};

type SharedRow = PrivateRow & {
  visibility: SharedVisibility;
};

export function listEventsForUser(userId: number): CalendarEvent[] {
  const privateRows = db
    .prepare(
      `SELECT pe.id, pe.titre, pe.date, pe.start_time, pe.end_time,
              pe.description, u.name AS creator_name
         FROM private_events pe
         JOIN users u ON u.id = pe.user_id
        WHERE pe.user_id = ?`,
    )
    .all(userId) as PrivateRow[];

  const sharedRows = db
    .prepare(
      `SELECT se.id, se.titre, se.date, se.start_time, se.end_time,
              se.description, se.visibility, u.name AS creator_name
         FROM shared_events se
         JOIN users u ON u.id = se.createur_id
        WHERE se.visibility = 'public'
           OR se.createur_id = ?
           OR EXISTS (
                SELECT 1
                  FROM shared_event_participants sep
                 WHERE sep.event_id = se.id
                   AND sep.user_id = ?
              )`,
    )
    .all(userId, userId) as SharedRow[];

  return [
    ...privateRows.map((row) => rowToEvent(row, "private")),
    ...sharedRows.map((row) => rowToEvent(row, "shared")),
  ];
}

function rowToEvent(row: PrivateRow, kind: EventKind): CalendarEvent {
  return {
    id: row.id,
    kind,
    userName: row.creator_name,
    title: row.titre,
    date: row.date,
    startTime: row.start_time ?? undefined,
    endTime: row.end_time ?? undefined,
    description: row.description ?? undefined,
  };
}

type CreateInput = {
  titre: string;
  date: string;
  startTime?: string;
  endTime?: string;
  description?: string;
};

export function createPrivateEvent(userId: number, input: CreateInput): number {
  const result = db
    .prepare(
      `INSERT INTO private_events
         (titre, date, start_time, end_time, description, user_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.titre,
      input.date,
      input.startTime || null,
      input.endTime || null,
      input.description || null,
      userId,
    );

  return Number(result.lastInsertRowid);
}

export function createSharedEvent(
  creatorId: number,
  input: CreateInput,
  visibility: SharedVisibility,
  participantIds: number[],
): number {
  const insert = db.transaction(() => {
    const result = db
      .prepare(
        `INSERT INTO shared_events
           (titre, date, start_time, end_time, description, createur_id, visibility)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        input.titre,
        input.date,
        input.startTime || null,
        input.endTime || null,
        input.description || null,
        creatorId,
        visibility,
      );

    const eventId = Number(result.lastInsertRowid);

    if (visibility === "private" && participantIds.length > 0) {
      const link = db.prepare(
        `INSERT OR IGNORE INTO shared_event_participants (event_id, user_id)
         VALUES (?, ?)`,
      );
      for (const participantId of participantIds) {
        if (participantId !== creatorId) {
          link.run(eventId, participantId);
        }
      }
    }

    return eventId;
  });

  return insert();
}

export function deleteEvent(
  eventId: number,
  kind: EventKind,
  userId: number,
): boolean {
  if (kind === "private") {
    const result = db
      .prepare("DELETE FROM private_events WHERE id = ? AND user_id = ?")
      .run(eventId, userId);
    return result.changes > 0;
  }

  const result = db
    .prepare("DELETE FROM shared_events WHERE id = ? AND createur_id = ?")
    .run(eventId, userId);
  return result.changes > 0;
}
