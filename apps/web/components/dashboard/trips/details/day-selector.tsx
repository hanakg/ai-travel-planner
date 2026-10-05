"use client";

import { Button } from "@/components/ui/button";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

type Props = {
  startDate: Date;
  endDate: Date;
};

export const DaySelector: React.FC<Props> = ({ startDate, endDate }) => {
  const [currentDayNum, setCurrentDayNum] = useState(0);

  const daysNum = useMemo(
    () => differenceInDays(endDate, startDate) + 1,
    [endDate, startDate],
  );

  const dates = useMemo(
    () =>
      eachDayOfInterval({
        start: startDate,
        end: endDate,
      }),
    [startDate, endDate],
  );

  const currentDay = useMemo(
    () => dates[currentDayNum],
    [currentDayNum, dates],
  );

  const handlePrevDay = useCallback(() => {
    setCurrentDayNum((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const handleNextDay = () => {
    setCurrentDayNum((prev) => (prev < daysNum - 1 ? prev + 1 : prev));
  };

  return (
    <div className="flex w-full flex-row items-center justify-center rounded-2xl border-2 bg-white p-4">
      <div className="flex flex-row items-center gap-2 sm:gap-3.5">
        <Button
          className="min-h-9.5 bg-white"
          variant="outline"
          disabled={currentDayNum === 0}
          onClick={handlePrevDay}
        >
          <div className="flex flex-row items-center gap-2">
            <ArrowLeft size={20} />
            <p className="text-md">Previous</p>
          </div>
        </Button>
        <div className="flex w-36 shrink-0 flex-col items-center text-center">
          <p className="text-md font-bold whitespace-nowrap">{`Day ${currentDayNum + 1} of ${daysNum}`}</p>
          <p className="text-xs whitespace-nowrap">
            {format(currentDay, "EEEE, MMMM d")}
          </p>
        </div>
        <Button
          className="min-h-9.5 bg-white"
          variant="outline"
          onClick={handleNextDay}
        >
          <div className="flex flex-row items-center gap-2">
            <p className="text-md">Next</p>
            <ArrowRight size={20} />
          </div>
        </Button>
      </div>
    </div>
  );
};
