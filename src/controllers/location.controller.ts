import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import {SERVICE} from "../constants/providers.contants";
import {DistanceServiceInterface} from "../services/distance/distance.service.interface";
import {Coordinate} from "../models/coordinate";
import {ApiUri} from "../constants/api.constants";
import {RequestLocation} from "../models/request-location";

@Controller(ApiUri.location)
export class LocationController {
    constructor(@Inject(SERVICE.distance) private readonly areaService: DistanceServiceInterface) {}

    //TODO: Eliminar al terminar desarrollo
    /* Endpoint de ejemplo para visualizar como se recibe la información y se retorna la mas cercana */
    @Get()
    getClosest(): Coordinate {
        let miConjunto: Coordinate = new Coordinate(4.751649608927578, -74.0970145448742, "Conjunto arboleda del parque");

        let plazaImperial: Coordinate = new Coordinate(4.7501342399421445, -74.09565336843772, "Cra. 104 #148 - 07, Bogotá, Cundinamarca");
        let uniCentro: Coordinate = new Coordinate(4.702362865602372, -74.04156321729367, "Cl. 142 #111A-06, Suba, Bogotá");
        let 富士山: Coordinate = new Coordinate(35.36100524652076, 138.72733665437113, "Monte Fuji, Honshu, Japón");
        let nurzholBoulevard: Coordinate = new Coordinate(51.12975003718817, 71.4223813141149, "Nurzhol Boulevard, Astaná, Kazakhstan");

        let coordinates: Coordinate[] = [plazaImperial, uniCentro, 富士山, nurzholBoulevard];

        return this.areaService.getClosest(miConjunto, coordinates);
    }

    @Post()
    getClosestCoordinate(@Body() data: RequestLocation): Coordinate {
        return this.areaService.getClosest(data.input, data.coordinateList);
    }
}
