export class Coordinate {
  x = undefined;
  y = undefined;
  address?: string;
  distance?: number;
  id: string;

  constructor(x?: number, y?: number, address?: string, distance?: number, id?: string) {
    this.distance = distance ? distance : undefined;
    this.id = id ? id : undefined;
    this.address = address;
    this.x = x;
    this.y = y;
  }
}
