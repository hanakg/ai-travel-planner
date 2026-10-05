import { activityIcons } from "@/consts.ts/activity-icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ActivityTypeValue } from "@/enums/trip-enums";
import { format } from "date-fns";
import { ChevronDown, GripVertical } from "lucide-react";
import React from "react";

type Props = {
  startTime: Date;
  duration: number;
  title: string;
  description: string;
  estimatedCost: number;
  currency: string;
  type: ActivityTypeValue;
  destination: string;
};

export const ActivityCard: React.FC<Props> = ({
  type,
  description,
  duration,
  estimatedCost,
  currency,
  startTime,
  title,
  destination,
}) => {
  const Icon = activityIcons[type];

  return (
    <Collapsible className="overflow-hidden rounded-xl border bg-white">
      <CollapsibleTrigger className="group/activity hover:bg-muted/50 focus-visible:ring-ring grid w-full grid-cols-[auto_auto_1fr_auto] items-center gap-4 p-4.5 text-left focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset">
        <GripVertical size={24} className="text-muted-foreground" />
        <div className="flex flex-col items-center gap-1.5">
          <div className="rounded-full bg-accent size-auto p-2">
            <Icon size={20} className="text-accent-foreground" />
          </div>
          <p className="text-xs text-secondary">{format(startTime, "HH:mm")}</p>
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold">{title}</p>
          <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
            {description}
          </p>
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span>{duration} min</span>
            <span aria-hidden="true">·</span>
            <span>{destination}</span>
            <span aria-hidden="true">·</span>
            <span>
              {estimatedCost > 0 ? `${currency} ${estimatedCost}` : "Free"}
            </span>
          </div>
        </div>
        <ChevronDown
          size={20}
          className="text-muted-foreground transition-transform duration-200 group-data-open:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t px-4.5 py-4 pl-16">
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};
