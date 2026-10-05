import { CreateTripFrom } from "@/components/dashboard/trips/create-trip-from";
import { PageContainer } from "@/components/page-container";

export default async function Page() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-1">
        <p className="text-primary text-3xl font-bold">
          Design your next journey
        </p>
        <p className="text-md text-secondary">
          Tell us how you like to travel. We’ll create a day-by-day plan focused
          on memorable activities.
        </p>
      </div>
      <CreateTripFrom />
    </PageContainer>
  );
}
