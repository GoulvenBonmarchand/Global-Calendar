"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/home/office-meeting.svg",
    alt: "Collègues en réunion autour d'un calendrier collaboratif",
    title: "Collaborez en équipe",
    description:
      "Chacun voit les événements importants et les disponibilités du groupe.",
  },
  {
    src: "/home/calendar-visual.svg",
    alt: "Calendrier en ligne stylisé",
    title: "Planifiez simplement",
    description:
      "Un calendrier lisible pour organiser les cours, réunions et projets.",
  },
  {
    src: "/home/freedom-app.svg",
    alt: "Personne libérée de ses problèmes d'organisation grâce à l'application",
    title: "Respirez enfin",
    description:
      "Moins d'oublis, moins de stress, plus de clarté au quotidien.",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70">
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-slate-100 md:aspect-16/10">
        <Image
          key={activeSlide.src}
          src={activeSlide.src}
          alt={activeSlide.alt}
          fill
          priority
          className="object-cover transition-opacity duration-700"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            {activeSlide.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {activeSlide.description}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Afficher l'image ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-slate-950"
                  : "w-2.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}