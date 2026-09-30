import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { TripService } from './trip.service';
import {
  createTripSchema,
  type UpdateTripInput,
  type CreateTripInput,
} from 'src/utils/validations/trip.schema';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  getAllTrips(@Session() session: UserSession) {
    return this.tripService.getAllTrips({ userId: session.user.id });
  }

  @Get(':id')
  getTrip(@Session() session: UserSession, @Param('id') id: string) {
    return this.tripService.getTrip({ id, userId: session.user.id });
  }

  @Post('/create')
  createTrip(
    @Session() session: UserSession,
    @Body(new ZodValidationPipe(createTripSchema)) data: CreateTripInput,
  ) {
    return this.tripService.createTrip({
      tripData: data,
      userId: session.user.id,
    });
  }

  @Patch(':id')
  updateTrip(
    @Session() session: UserSession,
    @Param('id') id: string,
    @Body() updatedTripData: UpdateTripInput,
  ) {
    return this.tripService.updateTrip({
      id,
      userId: session.user.id,
      updatedTripData,
    });
  }

  @Delete(':id')
  deleteTrip(@Session() session: UserSession, @Param('id') id: string) {
    return this.tripService.deleteTrip({ id, userId: session.user.id });
  }
}
