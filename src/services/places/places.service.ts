import { Injectable } from '@nestjs/common';
import { Client, Language } from '@googlemaps/google-maps-services-js';
import { PlacesServiceInterface } from 'src/services/places/places.service.interface';
import { PlaceInputType } from '@googlemaps/google-maps-services-js/dist/common';
import { PlacesResponse } from 'src/models/response-places';
import { Coordinate } from 'src/models/coordinate';

@Injectable()
export class PlacesService implements PlacesServiceInterface {
  private client: Client;

  constructor() {
    this.client = new Client({});
  }

  async getLocationFromDirection(
    directions: string[],
  ): Promise<Coordinate[]> {
    if (directions.length > 0) {
      const coincidences: Coordinate[] = [];
      for (const direction of directions) {
        const request = {
          params: {
            input: direction,
            inputtype: PlaceInputType.textQuery,
            language: Language.es,
            fields: ['formatted_address', 'geometry'],
            key: process.env.GOOGLE_API_KEY,
          },
        };

        await this.client
          .findPlaceFromText(request)
          .then((response) => {
            coincidences.push({
              x: response.data.candidates[0]?.geometry?.location?.lng,
              y: response.data.candidates[0]?.geometry?.location?.lat,
              address: response.data.candidates[0]?.formatted_address,
            });
          })
          .catch((error: any) => {
            throw Error('Google Api Error ' + error.message);
          });
      }
      return coincidences;
    }
  }
}
