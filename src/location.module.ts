import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DistanceService } from './services/distance/distance.service';
import { SERVICE } from './constants/providers.contants';
import { LocationController } from './controllers/location.controller';
import { PlacesService } from 'src/services/places/places.service';
import { MyLogger } from './services/logger/logger.service';

@Module({
  imports: [ConfigModule.forRoot() ],
  controllers: [LocationController],
  providers: [
    { provide: SERVICE.distance, useClass: DistanceService },
    { provide: SERVICE.places, useClass: PlacesService },
    MyLogger,
  ],
})
export class LocationModule {}
