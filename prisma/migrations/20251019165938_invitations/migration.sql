-- CreateTable
CREATE TABLE "Invitations" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
