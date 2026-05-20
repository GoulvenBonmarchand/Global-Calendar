export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>;
}) {
  const { username } = await searchParams;

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 text-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-center text-4xl font-black tracking-tight md:text-5xl">
          Bienvenue sur votre calendrier{" "}
          <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {username ?? "invité"}
          </span>
        </h1>
      </section>
    </main>
  );
}
