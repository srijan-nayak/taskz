/*
  Warnings:

  - A unique constraint covering the columns `[userId,organizationId]` on the table `Invitations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invitations_userId_organizationId_key" ON "Invitations"("userId", "organizationId");
