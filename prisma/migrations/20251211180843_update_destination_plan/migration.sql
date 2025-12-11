/*
  Warnings:

  - You are about to drop the column `duration` on the `destination_plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "destination_plans" DROP COLUMN "duration",
ADD COLUMN     "isVisited" BOOLEAN NOT NULL DEFAULT false;
