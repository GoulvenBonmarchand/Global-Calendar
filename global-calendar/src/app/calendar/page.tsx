import WelcomeBanner from "@/components/calendar/WelcomeBanner";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>;
}) {
  const { username } = await searchParams;
  return <WelcomeBanner username={username} />;
}
