/*
  Warnings:

  - You are about to drop the column `addressId` on the `orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orgId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgId` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_addressId_fkey";

-- DropIndex
DROP INDEX "orgs_addressId_key";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "addresses_orgId_key" ON "addresses"("orgId");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
