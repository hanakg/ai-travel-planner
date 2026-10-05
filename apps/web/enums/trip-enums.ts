export const TripStatus = {
  DRAFT: "DRAFT",
  GENERATING: "GENERATING",
  READY: "READY",
  FAILED: "FAILED",
} as const;

export type TripStatusValue = (typeof TripStatus)[keyof typeof TripStatus];

export const TravelStyle = {
  RELAXED: "RELAXED",
  BALANCED: "BALANCED",
  PACKED: "PACKED",
} as const;

export type TravelStyleValue = (typeof TravelStyle)[keyof typeof TravelStyle];

export const Transportation = {
  WALKING: "WALKING",
  PUBLIC_TRANSPORT: "PUBLIC_TRANSPORT",
  CAR: "CAR",
  MIXED: "MIXED",
} as const;

export type TransportationValue =
  (typeof Transportation)[keyof typeof Transportation];

export const Interest = {
  CULTURE: "CULTURE",
  BEACH: "BEACH",
  RESTAURANTS: "RESTAURANTS",
  MUSEUMS: "MUSEUMS",
  ARCHITECTURE: "ARCHITECTURE",
  NATURE: "NATURE",
  SHOPPING: "SHOPPING",
  NIGHTLIFE: "NIGHTLIFE",
  HISTORY: "HISTORY",
  ART: "ART",
  SPORTS: "SPORTS",
} as const;

export type InterestValue = (typeof Interest)[keyof typeof Interest];

export const TripLanguage = {
  English: "EN",
  Hungarian: "HU",
  German: "DE",
  Spanish: "ES",
  French: "FR",
  Italian: "IT",
} as const;

export type TripLanguageValue =
  (typeof TripLanguage)[keyof typeof TripLanguage];

export const ActivityType = {
  ATTRACTION: "ATTRACTION",
  FOOD: "FOOD",
  BEACH: "BEACH",
  SHOPPING: "SHOPPING",
  NIGHTLIFE: "NIGHTLIFE",
  TRANSPORT: "TRANSPORT",
  OTHER: "OTHER",
} as const;

export type ActivityTypeValue =
  (typeof ActivityType)[keyof typeof ActivityType];

export const BudgetCategory = {
  ACCOMMODATION: "ACCOMMODATION",
  FOOD: "FOOD",
  ACTIVITIES: "ACTIVITIES",
  TRANSPORT: "TRANSPORT",
  OTHER: "OTHER",
} as const;

export type BudgetCategoryValue =
  (typeof BudgetCategory)[keyof typeof BudgetCategory];

export const TimeOfDay = {
  MORNING: "MORNING",
  AFTERNOON: "AFTERNOON",
  EVENING: "EVENING",
  NIGHT: "NIGHT",
} as const;

export type TimeOfDayValue = (typeof TimeOfDay)[keyof typeof TimeOfDay];
