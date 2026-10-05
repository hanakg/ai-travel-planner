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
