import {Injectable} from '@nestjs/common';
import {DistanceServiceInterface} from "./distance.service.interface";
import {Coordinate} from "../../models/coordinate";
import {EARTH, ONE, RADIAN, THOUSAND, TWO} from "../../constants/data.constants";

@Injectable()
export class DistanceService implements DistanceServiceInterface {

    getClosest(input: Coordinate, coordinatesList?: Coordinate[]): Coordinate {
        const reduceClosest = (previous, current) => (previous.distance < current.distance) ? previous : current;
        return coordinatesList.map(c => ({...c, distance: this.getDistance(input, c)})).reduce(reduceClosest);
    }

    getDistance(i: Coordinate, c: Coordinate) {
        //Haversine Formula
        const toRad = (position: number) => Math.PI / RADIAN * position;
        const distanceSquaredSin = (c: Coordinate, axis: 'x' | 'y') => Math.pow(Math.sin((toRad(c[axis]) - toRad(i[axis])) / TWO), TWO);
        const a = (c: Coordinate) => distanceSquaredSin(c, 'x') + Math.cos(i.x) * Math.cos(c.x) * distanceSquaredSin(c, 'y');

        return Math.trunc(EARTH * (TWO * Math.asin(Math.min(ONE, Math.sqrt(a(c))))) * THOUSAND);
    }

}
