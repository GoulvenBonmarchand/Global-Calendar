import "server-only";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export type UserRow = {
  id: number;
  name: string;
  password_hash: string;
};

export function findUserByName(name: string): UserRow | null {
  const row = db
    .prepare(
      "SELECT id, name, password_hash FROM users WHERE LOWER(name) = LOWER(?)",
    )
    .get(name) as UserRow | undefined;

  return row ?? null;
}

export async function createUser(name: string, password: string): Promise<UserRow> {
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    throw new Error("Le nom d'utilisateur doit contenir au moins 2 caractères.");
  }
  if (password.length < 6) {
    throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
  }
  if (findUserByName(trimmed)) {
    throw new Error("Ce nom d'utilisateur est déjà pris.");
  }

  const hash = await bcrypt.hash(password, 10);
  const result = db
    .prepare("INSERT INTO users (name, password_hash) VALUES (?, ?)")
    .run(trimmed, hash);

  return {
    id: Number(result.lastInsertRowid),
    name: trimmed,
    password_hash: hash,
  };
}

export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function listOtherUsers(excludeId: number): Array<{ id: number; name: string }> {
  return db
    .prepare("SELECT id, name FROM users WHERE id != ? ORDER BY name")
    .all(excludeId) as Array<{ id: number; name: string }>;
}
