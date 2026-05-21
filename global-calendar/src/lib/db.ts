import "server-only";

import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { seedEvents, seedUsers } from "@/data/events";

const DB_PATH = resolve(process.cwd(), "data", "app.db");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS private_events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  titre       TEXT    NOT NULL,
  date        TEXT    NOT NULL,
  start_time  TEXT,
  end_time    TEXT,
  description TEXT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_private_events_user ON private_events(user_id);

CREATE TABLE IF NOT EXISTS shared_events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  titre       TEXT    NOT NULL,
  date        TEXT    NOT NULL,
  start_time  TEXT,
  end_time    TEXT,
  description TEXT,
  createur_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  visibility  TEXT    NOT NULL CHECK (visibility IN ('public','private'))
);

CREATE INDEX IF NOT EXISTS idx_shared_events_createur ON shared_events(createur_id);

CREATE TABLE IF NOT EXISTS shared_event_participants (
  event_id INTEGER NOT NULL REFERENCES shared_events(id) ON DELETE CASCADE,
  user_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, user_id)
);
`;

type GlobalWithDb = typeof globalThis & {
  __globalCalendarDb?: Database.Database;
};

const globalForDb = globalThis as GlobalWithDb;

function openDatabase(): Database.Database {
  mkdirSync(dirname(DB_PATH), { recursive: true });

  const instance = new Database(DB_PATH);
  instance.pragma("journal_mode = WAL");
  instance.pragma("foreign_keys = ON");
  instance.exec(SCHEMA);
  seedIfEmpty(instance);

  return instance;
}

export const db: Database.Database =
  globalForDb.__globalCalendarDb ?? openDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__globalCalendarDb = db;
}

function seedIfEmpty(instance: Database.Database) {
  const userCount = instance
    .prepare("SELECT COUNT(*) AS n FROM users")
    .get() as { n: number };

  if (userCount.n > 0) {
    return;
  }

  const insertUser = instance.prepare(
    "INSERT INTO users (name, password_hash) VALUES (?, ?)",
  );
  const insertPrivate = instance.prepare(
    `INSERT INTO private_events
       (titre, date, start_time, end_time, description, user_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const insertShared = instance.prepare(
    `INSERT INTO shared_events
       (titre, date, start_time, end_time, description, createur_id, visibility)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );
  const insertParticipant = instance.prepare(
    `INSERT INTO shared_event_participants (event_id, user_id) VALUES (?, ?)`,
  );

  const userIdByName = new Map<string, number>();

  for (const user of seedUsers) {
    const hash = bcrypt.hashSync(user.password, 10);
    const result = insertUser.run(user.name, hash);
    userIdByName.set(user.name, Number(result.lastInsertRowid));
  }

  const resolveUserId = (name: string): number => {
    const id = userIdByName.get(name);
    if (!id) {
      throw new Error(`Seed data references unknown user "${name}".`);
    }
    return id;
  };

  for (const event of seedEvents) {
    if (event.kind === "private") {
      insertPrivate.run(
        event.title,
        event.date,
        event.startTime || null,
        event.endTime || null,
        event.description || null,
        resolveUserId(event.owner),
      );
      continue;
    }

    const visibility = event.kind === "shared-public" ? "public" : "private";
    const sharedResult = insertShared.run(
      event.title,
      event.date,
      event.startTime || null,
      event.endTime || null,
      event.description || null,
      resolveUserId(event.creator),
      visibility,
    );
    const sharedEventId = Number(sharedResult.lastInsertRowid);

    if (event.kind === "shared-restricted") {
      for (const participantName of event.participants) {
        insertParticipant.run(sharedEventId, resolveUserId(participantName));
      }
    }
  }
}
