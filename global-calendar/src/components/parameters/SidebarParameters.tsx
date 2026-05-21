import Image from 'next/image';
import Link from 'next/link';

const links = [
    { href: "/calendar", label: "Vue d'ensemble" },
];

export default function SidebarParameters() {
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

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <Link
          href="/calendar"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Accueil
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
      </nav>

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