import SidebarParameters from '@/components/parameters/SidebarParameters';

export default function ParametersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen gap-3 bg-linear-to-b from-white via-slate-50 to-blue-50 p-3 text-slate-950">
      <SidebarParameters />
      <main className="flex-1">{children}</main>
    </div>
  );
}