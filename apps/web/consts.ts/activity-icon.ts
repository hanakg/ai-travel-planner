import { ActivityTypeValue } from "@/enums/trip-enums";
import {
  Camera,
  Utensils,
  Umbrella,
  ShoppingBag,
  Martini,
  Bus,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export const activityIcons: Record<ActivityTypeValue, LucideIcon> = {
  ATTRACTION: Camera,
  FOOD: Utensils,
  BEACH: Umbrella,
  SHOPPING: ShoppingBag,
  NIGHTLIFE: Martini,
  TRANSPORT: Bus,
  OTHER: MapPin,
};
