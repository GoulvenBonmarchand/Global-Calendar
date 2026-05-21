import Image from "next/image";
import Link from "next/link";

import MiniCalendar from "@/components/calendar/MiniCalendar";

const links = [
  { href: "/calendar", label: "Vue d'ensemble" },
  // { href: "/calendar/week", label: "Semaine" },
  // { href: "/calendar/month", label: "Mois" },
];

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col gap-3 rounded-2xl bg-slate-100 p-3">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/home/logo.svg"
            alt="Logo Global Calendar"
            width={32}
            height={32}
            priority
          />
          <span className="text-base font-black tracking-tight">
            Global Calendar
          </span>
        </Link>
      </div>

      <nav className="flex-1 rounded-xl border border-slate-200 bg-white p-3">
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <MiniCalendar />
      </nav>

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <Link
          href="/parameters"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
        >
          <span aria-hidden="true" className="text-base leading-none">
            ⚙
          </span>
          Paramètres
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <Link
          href="/login"
          className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-700"
        >
          Déconnexion
        </Link>
      </div>
    </aside>
  );
}
