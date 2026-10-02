import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  UnsplashPhoto,
  unsplashSearchResponseSchema,
} from 'src/utils/validations/unsplash.schema';
import { createApi } from 'unsplash-js';

@Injectable()
export class UnsplashService {
  private readonly unsplash;

  constructor() {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      throw new Error('UNSPLASH_ACCESS_KEY is not configured');
    }

    this.unsplash = createApi({
      accessKey,
    });
  }

  async getDestinationImg(destination: string): Promise<UnsplashPhoto | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const { data, error } = await this.unsplash.GET('/search/photos', {
      params: {
        query: {
          query: `${destination} city skyline cityscape`,
          per_page: 1,
          orientation: 'landscape',
          content_filter: 'high',
        },
      },
    });

    if (error || !data) {
      throw new InternalServerErrorException(
        'Failed to fetch images from Unsplash',
      );
    }

    const parsed = unsplashSearchResponseSchema.safeParse(data);

    if (!parsed.success) {
      throw new InternalServerErrorException(
        'Invalid response received from Unsplash',
      );
    }

    return parsed.data.results[0] ?? null;
  }
}
