import { Coordinate } from './coordinate';
import { Address } from './address';

export class RequestLocation {
  input: Coordinate;
  addressList: Coordinate[];
}

export interface AddressRequest {
  addressList: Address[];
  input: string;
}
