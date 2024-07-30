/*
  Warnings:

  - You are about to drop the column `lon` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Garage` table. All the data in the column will be lost.
  - You are about to drop the column `licenseID` on the `Valet` table. All the data in the column will be lost.
  - You are about to drop the column `pickupLon` on the `ValetAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `returnLon` on the `ValetAssignment` table. All the data in the column will be lost.
  - The primary key for the `Verification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `garageid` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the `BookingTimeLine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lng` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garageId` to the `Verification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookingTimeLine" DROP CONSTRAINT "BookingTimeLine_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "BookingTimeLine" DROP CONSTRAINT "BookingTimeLine_managerId_fkey";

-- DropForeignKey
ALTER TABLE "BookingTimeLine" DROP CONSTRAINT "BookingTimeLine_valetId_fkey";

-- DropForeignKey
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_garageid_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "lon",
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Garage" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Valet" DROP COLUMN "licenseID",
ADD COLUMN     "licenceID" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ValetAssignment" DROP COLUMN "pickupLon",
DROP COLUMN "returnLon",
ADD COLUMN     "pickupLng" DOUBLE PRECISION,
ADD COLUMN     "returnLng" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_pkey",
DROP COLUMN "garageid",
ADD COLUMN     "garageId" INTEGER NOT NULL,
ADD CONSTRAINT "Verification_pkey" PRIMARY KEY ("garageId");

-- DropTable
DROP TABLE "BookingTimeLine";

-- CreateTable
CREATE TABLE "BookingTimeline" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "BookingStatus" NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "valetId" TEXT,
    "managerId" TEXT,

    CONSTRAINT "BookingTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookingTimeline_bookingId_idx" ON "BookingTimeline"("bookingId");

-- AddForeignKey
ALTER TABLE "BookingTimeline" ADD CONSTRAINT "BookingTimeline_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingTimeline" ADD CONSTRAINT "BookingTimeline_valetId_fkey" FOREIGN KEY ("valetId") REFERENCES "Valet"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingTimeline" ADD CONSTRAINT "BookingTimeline_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
