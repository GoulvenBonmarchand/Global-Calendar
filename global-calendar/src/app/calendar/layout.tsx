import Sidebar from "@/components/calendar/Sidebar";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen gap-3 bg-linear-to-b from-white via-slate-50 to-blue-50 p-3 text-slate-950">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
