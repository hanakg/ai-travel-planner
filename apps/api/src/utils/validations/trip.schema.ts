import {
  Interest,
  TimeOfDay,
  Transportation,
  TravelStyle,
  TripLanguage,
} from 'generated/prisma/enums';
import z from 'zod';
import { toOpenApiSchema } from '../zod-openapi';

const timeSchema = z.union([
  z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  z.enum(TimeOfDay),
]);

export const createTripSchema = z
  .object({
    destination: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),

    arrivalLocation: z.string().optional(),
    arrivalTime: timeSchema.optional(),

    departureLocation: z.string().optional(),
    departureTime: timeSchema.optional(),

    travelers: z.number().int().min(1),

    currency: z.currencyCode(),
    budget: z.number().nonnegative(),

    travelStyle: z.enum(TravelStyle),
    transportation: z.enum(Transportation),
    language: z.enum(TripLanguage),

    interests: z.array(z.enum(Interest)),

    notes: z.string().max(2000).optional(),
  })
  .meta({ id: 'CreateTripSchema' });

export type CreateTripInput = z.infer<typeof createTripSchema>;

export const updateTripSchema = createTripSchema.partial();

export type UpdateTripInput = z.infer<typeof createTripSchema>;

export const createTripJsonSchema = toOpenApiSchema(createTripSchema);
