export class Coordinate {
  x = 0;
  y = 0;
  address?: string;
  distance?: number;

  constructor(x?: number, y?: number, address?: string, distance?: number) {
    this.x = x;
    this.y = y;
    this.address = address;
    this.distance = distance
  }
}
