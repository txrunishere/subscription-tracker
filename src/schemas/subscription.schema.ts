import { z } from "zod";

export const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  price: z.number().positive("Price must be a positive number"),
  currency: z
    .enum(
      [
        "USD",
        "EUR",
        "GBP",
        "INR",
        "JPY",
        "AUD",
        "CAD",
        "CHF",
        "CNY",
        "SEK",
        "NZD",
      ],
      "Currency must be one of USD, EUR, GBP, INR, JPY, AUD, CAD, CHF, CNY, SEK, NZD",
    )
    .default("INR"),
  frequency: z.enum(
    ["daily", "weekly", "monthly", "yearly"],
    "Frequency must be one of daily, weekly, monthly, yearly",
  ),
  category: z.enum(
    [
      "sports",
      "news",
      "entertainment",
      "lifestyle",
      "technology",
      "finance",
      "politics",
      "other",
    ],
    "Category must be one of sports, news, entertainment, lifestyle, technology, finance, politics, other",
  ),
  paymentMethod: z.string().min(1, "Payment method is required").trim(),
  startDate: z
    .date()
    .refine((date) => date <= new Date(), "Start date cannot be in the future"),
});
