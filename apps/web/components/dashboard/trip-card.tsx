import { formatDateRange } from "@/lib/date-format";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  imgUrl: string;
  title: string;
  from: Date;
  to: Date;
};

export const TripCard: React.FC<Props> = ({ id, imgUrl, title, from, to }) => {
  const daysNum = differenceInDays(to, from) + 1;
  return (
    <Link
      href={`/dashboard/trips/${id}`}
      className="group focus-visible:ring-primary block rounded-2xl transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-200 group-hover:shadow-lg">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="absolute object-cover"
          />
        </div>
        <div className="gap-2.5 p-4">
          <p className="text-primary text-lg font-semibold">{title}</p>
          <p className="text-secondary text-sm">{formatDateRange(from, to)}</p>
          <p className="text-primary text-sm font-semibold">{daysNum} days</p>
        </div>
      </div>
    </Link>
  );
};
