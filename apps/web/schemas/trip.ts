import {
  Interest,
  Transportation,
  TravelStyle,
  TripLanguage,
} from "@/enums/trip-enums";
import z from "zod";

export const createTripSchema = z.object({
  destination: z.string().min(2),
  startDate: z.date(),
  endDate: z.date(),
  travelers: z.number().int().min(1),
  budget: z.number().int().min(1),
  currency: z.currencyCode(),
  travelStyle: z.enum(TravelStyle),
  transportation: z.enum(Transportation),
  interests: z.array(z.enum(Interest)),
  language: z.enum(TripLanguage),
  arrivalLocation: z.string().optional(),
  arrivalTime: z.string().optional(),
  departureLocation: z.string().optional(),
  departureTime: z.string().optional(),
  note: z.string().optional(),
});

export type CreateTripValues = z.infer<typeof createTripSchema>;
