import {Coordinate} from "./coordinate";

export class LocationResponse extends Coordinate {
  map: string;
  error: boolean;

  constructor(map: string, error: boolean, x: number, y: number, address: string, distance: number) {
    super(x, y, address, distance);
    this.map = map;
    this.error = error;
    this.distance = distance;
  }
}
