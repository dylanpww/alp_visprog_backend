-- CreateTable
CREATE TABLE "destination_plans" (
    "id" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,

    CONSTRAINT "destination_plans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "destination_plans" ADD CONSTRAINT "destination_plans_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_plans" ADD CONSTRAINT "destination_plans_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
