import { Coordinate } from 'src/models/coordinate';

export interface PlacesServiceInterface {
  getLocationFromDirection(directions: string): Promise<Coordinate>;
}
