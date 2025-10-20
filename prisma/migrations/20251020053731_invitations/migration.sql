-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'TENTATIVE');

-- AlterTable
ALTER TABLE "Invitations" ADD COLUMN     "status" "InviteStatus" NOT NULL DEFAULT 'TENTATIVE';
