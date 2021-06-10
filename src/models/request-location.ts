import { Coordinate } from './coordinate';

export class RequestLocation {
  input: Coordinate;
  addressList: Coordinate[];
}

export interface AddressRequest {
  addressList: string[];
  input: string;
}
