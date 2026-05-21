import WelcomeBanner from "@/components/calendar/WelcomeBanner";
import CalendarGrid from "@/components/calendar/CalendarGrid"


export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>;
}) {
  const { username } = await searchParams;
  return (
  
    <main className="flex-1 rounded-xl bg-[#72a1ec] p-4 border border-slate-800 ">
      <WelcomeBanner username={username} />
        <CalendarGrid /> 
      </main>
  );
}