import { Coordinate } from './coordinate';

export class RequestLocation {
  input: Coordinate;
  coordinateList: Coordinate[];
}

export interface AddressRequest {
  addressList: string[];
  input?: string;
}
