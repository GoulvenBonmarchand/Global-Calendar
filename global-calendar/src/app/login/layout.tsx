import Image from "next/image";
import Link from "next/link";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 text-slate-950">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:pt-12">
        <header className="mb-6 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/home/logo.svg"
              alt="Logo Global Calendar"
              width={44}
              height={44}
              priority
            />
            <span className="text-xl font-black tracking-tight">
              Global Calendar
            </span>
          </Link>

          <p className="hidden rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm sm:inline-flex">
            Le calendrier collaboratif pour les équipes organisées
          </p>
        </header>

        <div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            Organisez vos projets.
            <span className="block bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Libérez votre temps.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Global Calendar aide votre équipe à créer des événements,
            visualiser les disponibilités et éviter les discussions
            interminables du type : “qui est libre quand ?”.
          </p>
        </div>

        <div className="mt-10">{children}</div>
      </section>
    </main>
  );
}
