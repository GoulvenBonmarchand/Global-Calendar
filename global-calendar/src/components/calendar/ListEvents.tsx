export type WeekEvent = {
  day: number;        // day of the month
  startHour: number;  // 24h
  endHour: number;
  title: string;
};

const events: WeekEvent[] = [
  { day: 8, startHour: 10, endHour: 12, title: "Sport" },
  { day: 8, startHour: 14, endHour: 17, title: "Trium" },
  { day: 9, startHour: 10, endHour: 12, title: "Sport" },
];

// Pre-grouped by day for O(1) lookup from the grid.
export const eventsByDay: Record<number, WeekEvent[]> = events.reduce(
  (acc, event) => {
    (acc[event.day] ??= []).push(event);
    return acc;
  },
  {} as Record<number, WeekEvent[]>,
);
