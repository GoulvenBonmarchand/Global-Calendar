export default function LoginForm() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
      <h2 className="text-2xl font-bold text-slate-950">Bienvenue</h2>
      <p className="mt-2 text-sm text-slate-600">
        Entrez votre nom d&apos;utilisateur pour continuer.
      </p>

      <form action="/calendar" className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
          Nom d&apos;utilisateur
          <input
            type="text"
            name="username"
            placeholder="ex : alice.martin"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-base font-normal text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>

        <button
          type="submit"
          className="mt-2 self-center rounded-full bg-slate-950 px-7 py-3 font-semibold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          Continuer
        </button>
      </form>
    </div>
  );
}
