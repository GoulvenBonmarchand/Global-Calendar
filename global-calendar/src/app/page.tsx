import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "@/components/home/Carousel";

const features = [
  "Calendrier partagé",
  "Disponibilités visibles",
  "Organisation plus simple",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 text-slate-950">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:pt-12">
        {/* Ligne du haut : logo à gauche, badge à droite */}
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

        {/* Bloc principal */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
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

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/calendar"
                className="rounded-full bg-slate-950 px-7 py-3 text-center font-semibold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Commencer maintenant
              </Link>
            </div>

            <div id="features" className="mt-10 grid gap-3 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-200/60 backdrop-blur transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-200/60"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div id="demo">
            <HeroCarousel />
          </div>
        </div>
      </section>
    </main>
  );
}