"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/lib/auth";
import { createUser } from "@/lib/users";

type AuthFormState = { error: string | null };

export async function loginAction(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Renseigne un nom d'utilisateur et un mot de passe." };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/calendar",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Identifiants invalides." };
    }
    throw error;
  }

  return { error: null };
}

export async function registerAction(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    await createUser(username, password);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible de créer le compte.",
    };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/calendar",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Compte créé mais connexion impossible." };
    }
    throw error;
  }

  return { error: null };
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
