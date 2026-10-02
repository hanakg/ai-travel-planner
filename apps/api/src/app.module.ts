import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './utils/auth';
import { TripModule } from './trip/trip.module';
import { GooglePlacesModule } from './google-places/google-places.module';
import { UnsplashModule } from './unsplash/unsplash.module';

@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    TripModule,
    GooglePlacesModule,
    UnsplashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
