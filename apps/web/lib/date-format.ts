import { format, isSameDay, isSameMonth } from "date-fns";

export const formatDateRange = (from: Date, to: Date) => {
  if (isSameDay(from, to)) {
    return format(from, "MMM d, yyyy");
  }

  if (isSameMonth(from, to)) {
    return `${format(from, "MMM d")}-${format(to, "d, yyyy")}`;
  }

  return `${format(from, "MMM d, yyyy")} - ${format(to, "MMM d, yyyy")}`;
};

export const formatActivityDuration = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hours`;
  return `${hours} hr ${minutes} min`;
};
