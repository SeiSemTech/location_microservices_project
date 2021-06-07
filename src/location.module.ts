import { Module } from '@nestjs/common';
import { DistanceService } from './services/distance/distance.service';
import {SERVICE} from "./constants/providers.contants";
import {LocationController} from "./controllers/location.controller";

@Module({
  imports: [],
  controllers: [LocationController],
  providers: [
    { provide: SERVICE.distance, useClass: DistanceService }
  ],
})
export class LocationModule {}
