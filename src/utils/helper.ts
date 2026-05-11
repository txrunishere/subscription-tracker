import { RepeatType } from "../types/index.js";

export function getRenewalDate(startDate: Date, repeatType: RepeatType) {
  const date = new Date(startDate);

  switch (repeatType.toLowerCase()) {
    case "daily":
      date.setDate(date.getDate() + 1);
      break;

    case "weekly":
      date.setDate(date.getDate() + 7);
      break;

    case "monthly":
      date.setMonth(date.getMonth() + 1);
      break;

    case "yearly":
      date.setFullYear(date.getFullYear() + 1);
      break;

    default:
      throw new Error(
        "Invalid repeat type. Use daily, weekly, monthly, or yearly.",
      );
  }

  return date;
}
