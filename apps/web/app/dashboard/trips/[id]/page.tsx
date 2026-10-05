import { TripItinerary } from "@/components/dashboard/trips/details/trip-itinerary";
import { PageContainer } from "@/components/page-container";
import { api } from "@/lib/api/client";
import { TripDetailsResponse } from "@repo/api/types";
import { notFound } from "next/navigation";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trip = await api<TripDetailsResponse>(
    `/trip/${encodeURIComponent(id)}`,
  );

  if (!trip) {
    notFound();
  }

  return (
    <PageContainer>
      <TripItinerary trip={trip} />
    </PageContainer>
  );
}
