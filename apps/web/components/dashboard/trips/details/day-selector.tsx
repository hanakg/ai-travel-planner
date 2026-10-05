"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  dates: Date[];
  currentDayNum: number;
  onDayChange: (dayNum: number) => void;
};

export const DaySelector: React.FC<Props> = ({
  dates,
  currentDayNum,
  onDayChange,
}) => {
  const currentDay = dates[currentDayNum];
  const daysNum = dates.length;

  return (
    <div className="flex w-full flex-row items-center justify-center rounded-2xl border-2 bg-white p-4">
      <div className="flex flex-row items-center gap-2 sm:gap-3.5">
        <Button
          className="min-h-9.5 bg-white"
          variant="outline"
          disabled={currentDayNum === 0}
          onClick={() => onDayChange(currentDayNum - 1)}
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
          disabled={currentDayNum === daysNum - 1}
          onClick={() => onDayChange(currentDayNum + 1)}
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
