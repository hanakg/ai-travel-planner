import z from 'zod';

export const googlePlaceSchema = z.object({
  formattedAddress: z.string().optional(),
  displayName: z.object({
    text: z.string(),
  }),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  websiteUri: z.string().optional(),
  googleMapsUri: z.string(),
});

export const googlePlacesResponseSchema = z.object({
  places: z.array(googlePlaceSchema),
});

export type GooglePlace = z.infer<typeof googlePlaceSchema>;
export type GooglePlacesResponse = z.infer<typeof googlePlacesResponseSchema>;
