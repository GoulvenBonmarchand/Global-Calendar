"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
] as const;

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"] as const;

export default function MiniCalendar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = new Date();
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const weeks = buildMonthWeeks(view.year, view.month);
  const selectedWeekStart = searchParams.get("weekStart");

  const goToPreviousMonth = () => {
    setView(({ year, month }) =>
      month === 0
        ? { year: year - 1, month: 11 }
        : { year, month: month - 1 },
    );
  };

  const goToNextMonth = () => {
    setView(({ year, month }) =>
      month === 11
        ? { year: year + 1, month: 0 }
        : { year, month: month + 1 },
    );
  };

  const selectWeek = (weekStart: Date) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("weekStart", formatDateParam(weekStart));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-2 border-t border-slate-200 pt-3">
      <div className="flex items-center justify-between px-1 pb-2">
        <button
          type="button"
          onClick={goToPreviousMonth}
          aria-label="Mois précédent"
          className="flex h-6 w-6 items-center justify-center rounded-md text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
        >
          ‹
        </button>
        <span className="text-xs font-semibold text-slate-700">
          {MONTHS[view.month]} {view.year}
        </span>
        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Mois suivant"
          className="flex h-6 w-6 items-center justify-center rounded-md text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 px-1 pb-1 text-center text-[10px] font-semibold text-slate-500">
        {WEEKDAYS.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>

      <div className="grid gap-0.5 px-1">
        {weeks.map((week) => {
          const weekStart = week[0].date;
          const isSelected =
            selectedWeekStart === formatDateParam(weekStart);

          return (
            <button
              key={weekStart.toISOString()}
              type="button"
              onClick={() => selectWeek(weekStart)}
              className={[
                "grid grid-cols-7 gap-0.5 rounded-lg p-0.5 transition",
                isSelected ? "bg-blue-100" : "hover:bg-blue-50",
              ].join(" ")}
              aria-label={`Afficher la semaine du ${weekStart.toLocaleDateString("fr-FR")}`}
            >
              {week.map(({ date, inMonth }) => {
                const isToday =
                  date.getFullYear() === today.getFullYear() &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() === today.getDate();

                return (
                  <span
                    key={date.toISOString()}
                    className={[
                      "flex h-6 items-center justify-center rounded-md text-[11px] font-medium",
                      isToday
                        ? "bg-blue-600 text-white"
                        : inMonth
                          ? "text-slate-700"
                          : "text-slate-300",
                    ].join(" ")}
                  >
                    {date.getDate()}
                  </span>
                );
              })}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildMonthWeeks(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1);
  const offsetToMonday = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - offsetToMonday);

  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );
    return { date, inMonth: date.getMonth() === month };
  });

  return Array.from({ length: 6 }, (_, weekIndex) =>
    days.slice(weekIndex * 7, weekIndex * 7 + 7),
  );
}

function formatDateParam(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
