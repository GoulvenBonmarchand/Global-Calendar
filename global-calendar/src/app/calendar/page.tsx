import WelcomeBanner from "@/components/calendar/WelcomeBanner";
import CalendarPreview from "@/app/calendar/CalendarPreview";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>;
}) {
  const { username } = await searchParams;

  return (
    <main>
      <WelcomeBanner username={username} />
      <CalendarPreview />
    </main>
  );
}