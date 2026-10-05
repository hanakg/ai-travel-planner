import { z } from 'zod';

export const unsplashPhotoSchema = z.object({
  id: z.string(),

  width: z.number().int().positive(),
  height: z.number().int().positive(),

  urls: z.object({
    regular: z.url(),
    thumb: z.url(),
  }),
  alt_description: z.string().nullable(),
  links: z.object({
    html: z.url(),
  }),
});

export const unsplashSearchResponseSchema = z.object({
  results: z.array(unsplashPhotoSchema),
});

export type UnsplashPhoto = z.infer<typeof unsplashPhotoSchema>;
