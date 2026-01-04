/*
  Warnings:

  - You are about to drop the column `createdAt` on the `provinces` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `provinces` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "icon" DROP DEFAULT;

-- AlterTable
ALTER TABLE "provinces" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
