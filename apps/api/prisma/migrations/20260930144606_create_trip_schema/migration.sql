-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('DRAFT', 'GENERATING', 'READY', 'FAILED');

-- CreateEnum
CREATE TYPE "TravelStyle" AS ENUM ('RELAXED', 'BALANCED', 'PACKED');

-- CreateEnum
CREATE TYPE "Transportation" AS ENUM ('WALKING', 'PUBLIC_TRANSPORT', 'CAR', 'MIXED');

-- CreateEnum
CREATE TYPE "Interest" AS ENUM ('CULTURE', 'BEACH', 'RESTAURANTS', 'MUSEUMS', 'ARCHITECTURE', 'NATURE', 'SHOPPING', 'NIGHTLIFE', 'HISTORY', 'ART', 'SPORTS');

-- CreateEnum
CREATE TYPE "TripLanguage" AS ENUM ('EN', 'HU', 'DE', 'ES', 'FR', 'IT');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('ATTRACTION', 'FOOD', 'BEACH', 'SHOPPING', 'NIGHTLIFE', 'TRANSPORT', 'OTHER');

-- CreateEnum
CREATE TYPE "BudgetCategory" AS ENUM ('ACCOMMODATION', 'FOOD', 'ACTIVITIES', 'TRANSPORT', 'OTHER');

-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'NIGHT');

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "coverImage" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "arrivalLocation" TEXT,
    "arrivalTime" TEXT,
    "departureLocation" TEXT,
    "departureTime" TEXT,
    "travelers" INTEGER NOT NULL,
    "budget" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "travelStyle" "TravelStyle" NOT NULL,
    "transportation" "Transportation" NOT NULL,
    "interests" "Interest"[],
    "language" "TripLanguage" NOT NULL DEFAULT 'EN',
    "notes" TEXT,
    "status" "TripStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripDay" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "tripDayId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3),
    "durationMin" INTEGER,
    "type" "ActivityType" NOT NULL,
    "estimatedCost" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "googleMapsUrl" TEXT,
    "websiteUrl" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetItem" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "category" "BudgetCategory" NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "estimated" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BudgetItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Trip_userId_idx" ON "Trip"("userId");

-- CreateIndex
CREATE INDEX "TripDay_tripId_idx" ON "TripDay"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "TripDay_tripId_date_key" ON "TripDay"("tripId", "date");

-- CreateIndex
CREATE INDEX "Activity_tripDayId_idx" ON "Activity"("tripDayId");

-- CreateIndex
CREATE INDEX "BudgetItem_tripId_idx" ON "BudgetItem"("tripId");

-- AddForeignKey
ALTER TABLE "TripDay" ADD CONSTRAINT "TripDay_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_tripDayId_fkey" FOREIGN KEY ("tripDayId") REFERENCES "TripDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
