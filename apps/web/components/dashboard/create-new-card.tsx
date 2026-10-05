import { Button } from "../ui/button";
import Link from "next/link";

export const CreateNewTripCard = () => {
  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat p-10"
      style={{
        backgroundImage: "url('/images/cards/create/background.jpeg')",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-blue-400/90 to-transparent" />
      <div className="relative flex h-full max-w-[33%] flex-col">
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-semibold text-white">
            Your next adventure is waiting
          </p>
          <p className="text-md font-light text-white">
            Share your pace, interests, and budget. The AI Travel Planner builds
            a thoughtful activity-first itinerary in minutes.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/trips/new" />}
          className="text-md mt-auto w-fit bg-white px-6 py-5 text-blue-500"
        >
          Create new trip
        </Button>
      </div>
    </div>
  );
};
