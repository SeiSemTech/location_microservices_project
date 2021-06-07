export class Coordinate {
    x: number = 0;
    y: number = 0;
    address?: string;

    constructor(x?: number, y?: number, address?: string) {
        this.x = x;
        this.y = y;
        this.address = address;
    }
}
