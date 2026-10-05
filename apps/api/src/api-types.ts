import type { z } from 'zod';
import type { createTripSchema } from './utils/validations/trip.schema';
import type { Jsonify } from 'type-fest';
import type { TripController } from './trip/trip.controller';

type WithDatesAsStrings<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: string;
};
type Unwrap<T extends (...args: any[]) => any> = Jsonify<
  Awaited<ReturnType<T>>
>;

export type RecentTripsResponse = Awaited<
  ReturnType<TripController['getRecentTrips']>
>;
export type TripDetailsResponse = Awaited<
  ReturnType<TripController['getTrip']>
>;

export type CreateTripBody = WithDatesAsStrings<
  z.input<typeof createTripSchema>,
  'startDate' | 'endDate'
>;
