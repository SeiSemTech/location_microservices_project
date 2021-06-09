import { Place } from '@googlemaps/google-maps-services-js';

export interface PlacesResponse {
  direction: string;
  candidates: Partial<Place>[];
}
