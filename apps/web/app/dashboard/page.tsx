import { CreateNewTripCard } from "@/components/dashboard/create-new-card";
import { TripCard } from "@/components/dashboard/trip-card";
import { PageContainer } from "@/components/page-container";
import { requireSession } from "@/lib/require-session";
import { api } from "@/lib/api/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RecentTripResponse } from "@/types/api-response.type";

export default async function Page() {
  const session = await requireSession();
  const recentTrips = await api<RecentTripResponse[]>("/trip/recent");

  return (
    <PageContainer>
      <div className="flex flex-col gap-1">
        <p className="text-primary text-3xl font-bold">
          Hello, {session.user.name.split(" ")[0]} 👋
        </p>
        <p className="text-md text-secondary">
          Your next chapter is closer than it looks.
        </p>
      </div>
      <CreateNewTripCard />
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-primary text-2xl font-bold">Recent trips</p>
          <Link href="/dashboard/trips">
            <div className="text-accent-foreground flex flex-row items-center gap-2">
              <p className="text-md">View all</p>
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
        {recentTrips.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {recentTrips.map((trip) => (
              <TripCard
                key={`${trip.id}`}
                id={trip.id}
                title={trip.destination}
                from={new Date(trip.startDate)}
                to={new Date(trip.endDate)}
                imgUrl={
                  trip.coverImage ?? "/images/cards/create/background.jpeg" // TODO: Add a default image
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-secondary text-sm">
            No trips yet. Start planning your next adventure.
          </p>
        )}
      </div>
    </PageContainer>
  );
}
