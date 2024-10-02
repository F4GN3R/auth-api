/*
  Warnings:

  - A unique constraint covering the columns `[recoveryHash]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dateExpirationRecoveryHash" TIMESTAMP(3),
ADD COLUMN     "recoveryHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_recoveryHash_key" ON "User"("recoveryHash");
