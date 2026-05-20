import WelcomeBanner from "@/components/calendar/WelcomeBanner";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>;
}) {
  const { username } = await searchParams;

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 text-slate-950">
      <WelcomeBanner username={username} />
    </main>
  );
}
