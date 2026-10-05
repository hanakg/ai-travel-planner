import { Module } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';

@Module({
  exports: [UnsplashService],
  providers: [UnsplashService],
})
export class UnsplashModule {}
