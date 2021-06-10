import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { SERVICE } from '../constants/providers.contants';
import { DistanceServiceInterface } from '../services/distance/distance.service.interface';
import { Coordinate } from '../models/coordinate';
import { ApiUri } from '../constants/api.constants';
import { AddressRequest, RequestLocation } from '../models/request-location';
import { PlacesService } from 'src/services/places/places.service';
import { LocationResponse } from 'src/models/response-location';
import { MapaService } from 'src/services/mapa/mapa.service';

@Controller(ApiUri.location)
export class LocationController {
  constructor(
    @Inject(SERVICE.distance)
    private readonly areaService: DistanceServiceInterface,
    @Inject(SERVICE.places)
    private readonly placesService: PlacesService,
    private renderService: MapaService,

  ) {}

  // TODO dejo el tipo de return any por mientras tanto
  @Get()
  async getClosest(@Body() data: AddressRequest): Promise<LocationResponse> {
    const placesResponse = await this.placesService
      .getLocationFromDirection(data.addressList)
      .catch((error) => {
        throw new HttpException(
          'Google is not responding: ' + error.message,
          HttpStatus.BAD_GATEWAY,
        );
      });
    if (data.addressList.length > 1) {
      // COVED
      const miConjunto: Coordinate = new Coordinate(
        4.751649608927578,
        -74.0970145448742,
        'Conjunto arboleda del parque',
      );

      const plazaImperial: Coordinate = new Coordinate(
        4.7501342399421445,
        -74.09565336843772,
        'Cra. 104 #148 - 07, Bogotá, Cundinamarca',
      );
      const uniCentro: Coordinate = new Coordinate(
        4.702362865602372,
        -74.04156321729367,
        'Cl. 142 #111A-06, Suba, Bogotá',
      );
      const 富士山: Coordinate = new Coordinate(
        35.36100524652076,
        138.72733665437113,
        'Monte Fuji, Honshu, Japón',
      );
      const nurzholBoulevard: Coordinate = new Coordinate(
        51.12975003718817,
        71.4223813141149,
        'Nurzhol Boulevard, Astaná, Kazakhstan',
      );

      const coordinates: Coordinate[] = [
        plazaImperial,
        uniCentro,
        富士山,
        nurzholBoulevard,
      ];

      // return this.areaService.getClosest(miConjunto, coordinates);
    } else {
      // Zapacommerce
      return {
        map: null,
        error: !placesResponse[0]?.x && !placesResponse[0]?.y,
        x: placesResponse[0]?.x,
        y: placesResponse[0]?.y,
        address: placesResponse[0]?.address,
        distance: 0,
      };
    }
  }

  @Post()
  getClosestCoordinate(@Body() data: RequestLocation): Coordinate {
    return this.areaService.getClosest(data.input, data.coordinateList);
  }

  @Get('mapa')
  getrender(){
    console.log(this.renderService.loadMap());    
  }
}
