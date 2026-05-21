import { redirect } from "next/navigation";

import CalendarCreateEvent from "@/app/calendar/CalendarCreateEvent";
import WelcomeBanner from "@/components/calendar/WelcomeBanner";
import { auth } from "@/lib/auth";
import { listEventsForUser } from "@/lib/events-repo";
import { listOtherUsers } from "@/lib/users";

export default async function CalendarPage() {
  const session = await auth();
  const userId = session?.user?.id ? Number(session.user.id) : null;

  if (!userId) {
    redirect("/login");
  }

  const events = listEventsForUser(userId);
  const participants = listOtherUsers(userId);

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
