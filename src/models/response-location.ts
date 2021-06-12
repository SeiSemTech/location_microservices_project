import { Coordinate } from './coordinate';

export class LocationResponse extends Coordinate {
  id: string;
  error: boolean;

  constructor(id: string, error: boolean, x: number, y: number, address: string, distance) {
    super(x, y, address, distance);
    this.id = id;
    this.error = error;
  }
}
