import { Coordinate } from 'src/models/coordinate';

export interface PlacesServiceInterface {
  getAddressLocation(directions: string): Promise<Coordinate>;
}
