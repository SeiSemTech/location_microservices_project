import {Coordinate} from "../../models/coordinate";

export interface DistanceServiceInterface {
    getClosest(coordinate: Coordinate, coordinatesList?: Coordinate[]): Coordinate;
}
