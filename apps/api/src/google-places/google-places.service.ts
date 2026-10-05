import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { googlePlacesResponseSchema } from 'src/utils/validations/google-place.schema';

@Injectable()
export class GooglePlacesService {
  private readonly apiKey = process.env.GOOGLE_PLACES_API_KEY;

  async getPlaceInfo(destination: string) {
    if (!this.apiKey) {
      throw new Error('Google Places API key not found');
    }

    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': this.apiKey,
          'X-Goog-FieldMask': 'places',
        },
        body: JSON.stringify({
          textQuery: destination,
        }),
      },
    );

    console.log('response', destination, response);

    if (!response.ok) {
      throw new InternalServerErrorException(
        `Google Places API returned ${response.status}`,
      );
    }

    const rawData: unknown = await response.json();

    const responseData = googlePlacesResponseSchema.parse(rawData);

    const place = responseData.places[0];

    if (!place) {
      return null;
    }

    const returnData = {
      formattedAddress: place.formattedAddress ?? '',
      displayName: place.displayName.text,
      coordinates: {
        latitude: place.location.latitude,
        longitude: place.location.longitude,
      },
      url: place.websiteUri ?? '',
      googleMapsUrl: place.googleMapsUri,
    };

    return returnData;
  }
}
