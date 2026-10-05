import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'src/prisma/prisma';
import {
  CreateTripInput,
  UpdateTripInput,
} from 'src/utils/validations/trip.schema';
import { differenceInCalendarDays, format } from 'date-fns';
import { GeminiService } from 'src/ai/gemini.service';
import { GooglePlacesService } from 'src/google-places/google-places.service';
import { UnsplashService } from 'src/unsplash/unsplash.service';
import pLimit from 'p-limit';

@Injectable()
export class TripService {
  private readonly limit = pLimit(5);
  constructor(
    private readonly geminiService: GeminiService,
    private readonly googlePlacesService: GooglePlacesService,
    private readonly unsplashService: UnsplashService,
  ) {}

  async getAllTrips({ userId }: { userId: string }) {
    return prisma.trip.findMany({
      where: { userId },
      include: {
        budgetItems: true,
        days: {
          orderBy: { order: 'asc' },
          include: {
            activities: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRecentTrips({ userId }: { userId: string }) {
    const trips = await prisma.trip.findMany({
      where: { userId },
      select: {
        id: true,
        destination: true,
        startDate: true,
        endDate: true,
        coverImage: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });

    return trips;
  }

  async getTrip({ id, userId }: { id: string; userId: string }) {
    const tripDetails = await prisma.trip.findUnique({
      where: { id, userId },
      include: {
        budgetItems: true,
        days: {
          orderBy: { order: 'asc' },
          include: {
            activities: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!tripDetails) {
      return null;
    }

    const days = tripDetails.days.map((day) => {
      const totalActivityDurationMin = day.activities.reduce(
        (total, activity) => total + (activity.durationMin ?? 0),
        0,
      );

      return {
        ...day,
        activitiesNum: day.activities.length,
        totalActivityDurationMin,
      };
    });
    const activitiesNum = days.reduce(
      (total, day) => total + day.activitiesNum,
      0,
    );

    return {
      ...tripDetails,
      duration:
        differenceInCalendarDays(tripDetails.endDate, tripDetails.startDate) +
        1,
      activitiesNum,
      days,
    };
  }

  async createTrip({
    tripData,
    userId,
  }: {
    tripData: CreateTripInput;
    userId: string;
  }) {
    const prompt = `
        Create a travel itinerary based on these requirements:

        Destination: ${tripData.destination}
        Start date: ${format(tripData.startDate, 'yyyy-MM-dd')}
        End date: ${format(tripData.endDate, 'yyyy-MM-dd')}
        Travelers: ${tripData.travelers}
        Budget: ${tripData.budget} ${tripData.currency}
        Travel style: ${tripData.travelStyle}
        Transportation: ${tripData.transportation}
        Interests: ${tripData.interests.join(', ')}
        Language: ${tripData.language}
        Additional notes: ${tripData.notes ?? 'None'}

        Arrival: Location: ${tripData.arrivalLocation ?? 'Not specified'} Time: ${tripData.arrivalTime ?? 'Not specified'} Departure: Location: ${tripData.departureLocation ?? 'Not specified'} Time: ${tripData.departureTime ?? 'Not specified'} ARRIVAL AND DEPARTURE RULES: - The arrival information describes when and where the traveler arrives at the destination. - The arrival time can be an exact time such as "18:30" or a time of day such as "MORNING", "AFTERNOON", "EVENING", or "NIGHT". - Do not schedule activities before the arrival time. - If only a time of day is provided, use reasonable assumptions within that period. - Allow reasonable time to travel from the arrival location to the first activity or accommodation. - The departure information describes when and where the traveler leaves the destination. - The departure time can be an exact time such as "15:00" or a time of day such as "MORNING", "AFTERNOON", "EVENING", or "NIGHT". - Do not schedule activities after the departure time. - Allow enough time to travel from the final activity to the departure location. - If arrival or departure information is not specified, do not invent a specific time or location. GENERAL PLANNING RULES: - Create a realistic itinerary for every day from the start date through the end date. - Respect the traveler's interests and travel style. - Avoid an unnecessarily packed schedule unless the travel style is PACKED. - Consider realistic travel time between activities. - Group activities that are geographically close when possible. - Estimated costs are approximate estimates and are not guaranteed real-world prices. - Do not generate database IDs, trip IDs, or ordering fields. - Use the requested language for all generated text.

        Return ONLY valid JSON.

        The JSON must have this structure:

        {
          "days": [
            {
              "dayNumber": 1,
              "date": "2026-09-25",
              "activities": [
                {
                  "title": "Eiffel Tower",
                  "description": "Visit the Eiffel Tower",
                  "startTime": "10:00",
                  "durationMin": 120,
                  "type": "ATTRACTION",
                  "estimatedCost": 30
                }
              ]
            }
          ],
          "budgetItems": [
            {
              "category": "ACTIVITIES",
              "description": "Attraction tickets",
              "amount": 30
            }
          ]
        }
`;
    const [generatedTrip, destinationPlaceInfo, destinationImg] =
      await Promise.all([
        this.geminiService.generateTrip(prompt),
        this.googlePlacesService.getPlaceInfo(tripData.destination),
        this.unsplashService.getDestinationImg(tripData.destination),
      ]);

    // TODO: google places API - Too Many Request error
    /*  const activitiesWithPlaceInfo = await Promise.all(
      generatedTrip.days.map(async (day) => ({
        ...day,
        activities: await Promise.all(
          day.activities.map(async (activity) => {
            if (activity.type === ActivityType.TRANSPORT) {
              return {
                ...activity,
                placeInfo: null,
              };
            }

            const placeInfo = await this.limit(() =>
              this.googlePlacesService.getPlaceInfo(activity.title),
            );

            return {
              ...activity,
              placeInfo,
            };
          }),
        ),
      })),
    ); */

    const result = await prisma.$transaction(async (tx) => {
      const trip = await tx.trip.create({
        data: {
          userId,
          title: `${destinationPlaceInfo?.displayName ?? tripData.destination} Trip`,
          coverImage: destinationImg?.urls.regular,
          ...tripData,
          ...(destinationPlaceInfo?.formattedAddress && {
            destination: destinationPlaceInfo.formattedAddress,
          }),
        },
      });

      for (const [i, day] of generatedTrip.days.entries()) {
        /* const dayActivitiesWithPlaceInfo =
          activitiesWithPlaceInfo[i].activities; */

        await tx.tripDay.create({
          data: {
            tripId: trip.id,
            date: new Date(day.date),
            dayNumber: day.dayNumber,
            order: i,

            activities: {
              create: /* dayActivitiesWithPlaceInfo */ day.activities.map(
                (activity, activityIndex) => ({
                  title: activity.title,
                  description: activity.description,
                  startTime: activity.startTime
                    ? new Date(`${day.date}T${activity.startTime}:00`)
                    : null,
                  durationMin: activity.durationMin,
                  type: activity.type,
                  estimatedCost: activity.estimatedCost,
                  currency: trip.currency,
                  order: activityIndex,
                  /* googleMapsUrl: activity.placeInfo?.googleMapsUrl,
                  websiteUrl: activity.placeInfo?.url,
                  latitude: activity.placeInfo?.coordinates.latitude,
                  longitude: activity.placeInfo?.coordinates.longitude, */
                }),
              ),
            },
          },
        });
      }

      await tx.budgetItem.createMany({
        data: generatedTrip.budgetItems.map((item) => ({
          tripId: trip.id,
          category: item.category,
          description: item.description,
          amount: item.amount,
        })),
      });

      return trip;
    });

    return result;
  }

  async updateTrip({
    id,
    userId,
    updatedTripData,
  }: {
    id: string;
    userId: string;
    updatedTripData: UpdateTripInput;
  }) {
    const trip = await prisma.trip.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    const updatedTrip = await prisma.trip.update({
      where: {
        id: trip.id,
      },
      data: updatedTripData,
    });

    return updatedTrip;
  }

  async deleteTrip({ id, userId }: { id: string; userId: string }) {
    const trip = await prisma.trip.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    await prisma.trip.delete({
      where: {
        id: trip.id,
      },
    });

    return { message: 'Trip deleted successfully' };
  }
}
