"use client";

import { ActivityCard } from "@/components/dashboard/trips/details/activity-card";
import { DaySelector } from "@/components/dashboard/trips/details/day-selector";
import { TripDetailsHeader } from "@/components/dashboard/trips/details/detail-header";
import { formatActivityDuration } from "@/lib/date-format";
import type { TripDetailsResponse } from "@repo/api/types";
import { useState } from "react";

export function TripItinerary({
  trip,
}: {
  trip: NonNullable<TripDetailsResponse>;
}) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDay = trip.days[selectedDayIndex];

  return (
    <div className="flex flex-col gap-6">
      <TripDetailsHeader
        activitiesNum={trip.activitiesNum}
        budget={Number(trip.budget)}
        currency={trip.currency}
        coverImage={trip.coverImage ?? "/images/cards/create/background.jpeg"}
        destination={trip.destination}
        duration={trip.duration}
        startDate={new Date(trip.startDate)}
        endDate={new Date(trip.endDate)}
      />
      {selectedDay ? (
        <>
          <DaySelector
            dates={trip.days.map((day) => new Date(day.date))}
            currentDayNum={selectedDayIndex}
            onDayChange={setSelectedDayIndex}
          />
          <div>
            <p className="text-primary text-2xl font-bold">
              {trip.destination} Day {selectedDay.dayNumber}
            </p>
            <p className="text-md text-secondary">
              {selectedDay.activitiesNum} activities · Approx.{" "}
              {formatActivityDuration(selectedDay.totalActivityDurationMin)}
            </p>
          </div>
          {selectedDay.activities.length > 0 ? (
            <div className="flex flex-col gap-3">
              {selectedDay.activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  currency={activity.currency}
                  description={activity.description}
                  destination={trip.destination}
                  duration={activity.durationMin}
                  estimatedCost={
                    activity.estimatedCost === null
                      ? null
                      : Number(activity.estimatedCost)
                  }
                  startTime={
                    activity.startTime ? new Date(activity.startTime) : null
                  }
                  title={activity.title}
                  type={activity.type}
                />
              ))}
            </div>
          ) : (
            <p className="text-secondary text-sm">
              No activities planned for this day.
            </p>
          )}
        </>
      ) : (
        <p className="text-secondary text-sm">No itinerary days found.</p>
      )}
    </div>
  );
}
