"use client";

import { useActionState, useState } from "react";

import { loginAction, registerAction } from "@/app/login/actions";

type Mode = "login" | "register";

export default function LoginForm() {
  const [mode, setMode] = useState<Mode>("login");
  const action = mode === "login" ? loginAction : registerAction;
  const [state, formAction, pending] = useActionState(action, { error: null });

  const isLogin = mode === "login";

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
      <h2 className="text-2xl font-bold text-slate-950">
        {isLogin ? "Bienvenue" : "Créer un compte"}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        {isLogin
          ? "Entrez votre nom d'utilisateur et votre mot de passe pour continuer."
          : "Choisissez un nom d'utilisateur et un mot de passe."}
      </p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
          Nom d&apos;utilisateur
          <input
            type="text"
            name="username"
            required
            autoComplete={isLogin ? "username" : "off"}
            placeholder="ex : alice.martin"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-base font-normal text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
          Mot de passe
          <input
            type="password"
            name="password"
            required
            minLength={6}
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="••••••"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-base font-normal text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>

        {state.error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 self-center rounded-full bg-slate-950 px-7 py-3 font-semibold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-slate-950"
        >
          {pending
            ? "Veuillez patienter..."
            : isLogin
              ? "Continuer"
              : "Créer le compte"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(isLogin ? "register" : "login")}
        className="mt-4 block w-full text-center text-sm font-semibold text-slate-600 transition hover:text-blue-700"
      >
        {isLogin
          ? "Pas encore de compte ? Créer un compte"
          : "Déjà un compte ? Se connecter"}
      </button>
    </div>
  );
}
