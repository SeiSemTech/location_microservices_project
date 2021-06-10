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

@Controller(ApiUri.location)
export class LocationController {
  constructor(
    @Inject(SERVICE.distance)
    private readonly areaService: DistanceServiceInterface,
    @Inject(SERVICE.places)
    private readonly placesService: PlacesService,
  ) {}

  @Get('only-get-info')
  async getClosest(@Body() data: AddressRequest): Promise<LocationResponse> {
    const placesResponse = await this.placesService
      .getLocationFromDirection(data.addressList[0])
      .catch((error) => {
        throw new HttpException(
          'Google is not responding: ' + error.message,
          HttpStatus.BAD_GATEWAY,
        );
      });
    if (!(data.addressList.length > 1)) {
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

  @Post('closest-address')
  getClosestCoordinate(@Body() data: RequestLocation): Coordinate {
    return this.areaService.getClosest(data.input, data.addressList);
  }

  @Post()
  async getAddressInfo(@Body() data: AddressRequest): Promise<LocationResponse> {
    try {
      const input: Coordinate = await this.placesService.getLocationFromDirection(data.input);
      if (data.addressList) { //Covid project
        const coordinates: Coordinate[] =
            await Promise.all(data.addressList.map(async address =>
                await this.placesService.getLocationFromDirection(address)));

        const{ x, y, address, distance} = this.areaService.getClosest(input, coordinates);

        // Heiner aquí tu parte para el mapa
        return new LocationResponse( null, false, x, y, address, distance);
      } else { //Zapa-commerce
        return new LocationResponse(null,!input?.x && !input?.y, input?.x, input?.y, input?.address,0);
      }

    } catch(error) {
      throw new HttpException('Google is not responding: ' + error.message, HttpStatus.BAD_GATEWAY );
    }
  }
}
