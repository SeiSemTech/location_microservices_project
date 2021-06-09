export class Coordinate {
  x = 0;
  y = 0;
  address?: string;

  constructor(x?: number, y?: number, address?: string) {
    this.x = x;
    this.y = y;
    this.address = address;
  }
}
