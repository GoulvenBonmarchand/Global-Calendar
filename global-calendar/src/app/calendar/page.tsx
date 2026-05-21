import CalendarCreateEvent from "@/app/calendar/CalendarCreateEvent";
import WelcomeBanner from "@/components/calendar/WelcomeBanner";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string; weekStart?: string }>;
}) {
  const { username, weekStart } = await searchParams;

  return (
    <>
      <WelcomeBanner username={username} />
      <CalendarCreateEvent initialWeekStart={weekStart} />
    </>
  );
}
