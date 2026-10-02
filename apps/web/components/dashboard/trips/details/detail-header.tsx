import { formatDateRange } from "@/lib/date-format";
import Image from "next/image";

type Props = {
  destination: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  coverImage: string;
  activitiesNum: number;
  budget: number;
  currency: string;
};

export const TripDetailsHeader: React.FC<Props> = ({
  activitiesNum,
  budget,
  coverImage,
  destination,
  duration,
  endDate,
  startDate,
  currency,
}) => {
  return (
    <div className="bg-dark-bg grid min-h-98.75 w-full grid-rows-[2fr_1fr] overflow-hidden rounded-2xl">
      <div className="relative min-h-0 w-full">
        <Image
          src={coverImage}
          alt={destination}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-row justify-between p-6.5">
        <div className="flex flex-col gap-2">
          <p className="text-accent text-sm font-bold">Your itinerary</p>
          <p className="text-4xl font-bold text-white">{destination}</p>
          <p className="text-md text-light-gray">
            {formatDateRange(startDate, endDate)}
          </p>
        </div>

        <div className="flex h-full flex-row items-center gap-7.5">
          <div className="flex flex-col gap-1">
            <p className="text-light-gray-2 text-xs">Duration</p>
            <p className="text-md text-white">{duration} days</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-gray-2 text-xs">Activities</p>
            <p className="text-md text-white">{activitiesNum} planned</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-gray-2 text-xs">Budget</p>
            <p className="text-md text-white">
              {`${currency} ${budget.toLocaleString("en-US")}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
