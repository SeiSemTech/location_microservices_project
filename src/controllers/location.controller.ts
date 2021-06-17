import { Body, Controller, Get, Inject, Post, HttpStatus, HttpException } from '@nestjs/common';
import { SERVICE } from '../constants/providers.contants';
import { DistanceServiceInterface } from '../services/distance/distance.service.interface';
import { Coordinate } from '../models/coordinate';
import { ApiUri } from '../constants/api.constants';
import { AddressRequest, RequestLocation } from '../models/request-location';
import { PlacesService } from 'src/services/places/places.service';
import { LocationResponse } from 'src/models/response-location';
import { Address } from '../models/address';
import { MyLogger } from '../services/logger/logger.service';

@Controller(ApiUri.location)
export class LocationController {
  constructor(
    @Inject(SERVICE.distance)
    private readonly areaService: DistanceServiceInterface,
    @Inject(SERVICE.places)
    private readonly placesService: PlacesService,
    private readonly loggerService: MyLogger,
  ) {}

  @Get('only-get-info')
  async getClosest(@Body() data: AddressRequest): Promise<LocationResponse> {
    const placesResponse: Coordinate = await this.placesService
      .getAddressLocation(data.input)
      .catch((error) => {
        throw new HttpException(
          'Google is not responding: ' + error.message,
          HttpStatus.BAD_GATEWAY,
        );
      });
    return { error: !placesResponse?.x && !placesResponse?.y, ...placesResponse };
  }

  @Post('closest-address')
  getClosestCoordinate(@Body() data: RequestLocation): Coordinate {
    return this.areaService.getClosest(data.input, data.addressList);
  }

  @Post()
  async getAddressInfo(@Body() data: AddressRequest): Promise<LocationResponse> {
    try {
      this.loggerService.log(`Obteniendo ${data.input}`);
      const input: Coordinate = await this.placesService.getAddressLocation(data.input);
      if (data.addressList && input?.x && input?.y) {
        //Covid project
        this.loggerService.log(`Obteniendo ${JSON.stringify(data.addressList)}`);
        const coordinates: Coordinate[] = await Promise.all(
          data.addressList.map(async (a: Address) => ({
            ...(await this.placesService.getAddressLocation(a.address)),
            id: a.id,
          })),
        );
        this.loggerService.log(`Resolviendo ${JSON.stringify(coordinates)}`);
        const closestPlace = this.areaService.getClosest(input, coordinates);
        return { error: !closestPlace.distance , ...closestPlace };
      } else {
        //Zapa-commerce
        return { error: !input?.x && !input?.y, ...input };
      }
    } catch (e) {
      this.loggerService.error('Me totié...🤦‍♂️', undefined);
      throw new HttpException('Google not respond: ' + e.message, HttpStatus.BAD_GATEWAY)
    }
  }
}
