import { Injectable } from '@nestjs/common';
import { Client, Language } from '@googlemaps/google-maps-services-js';
import { PlacesServiceInterface } from 'src/services/places/places.service.interface';
import { PlaceInputType } from '@googlemaps/google-maps-services-js/dist/common';
import { Coordinate } from 'src/models/coordinate';
import { FindPlaceFromTextRequest } from '@googlemaps/google-maps-services-js/dist/places/findplacefromtext';

@Injectable()
export class PlacesService implements PlacesServiceInterface {
  private client: Client;

  constructor() {
    this.client = new Client({});
  }

  async getAddressLocation(direction: string): Promise<Coordinate> {
    const coordinate: Coordinate = new Coordinate();
    const request: FindPlaceFromTextRequest = {
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
        coordinate.x = response.data.candidates[0]?.geometry?.location?.lng;
        coordinate.y = response.data.candidates[0]?.geometry?.location?.lat;
        coordinate.address = response.data.candidates[0]?.formatted_address;
      })
      .catch((error: any) => {
        throw Error('Google Api Error ' + error.message);
      });
    return coordinate;
  }
}
