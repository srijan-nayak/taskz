import { Role } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

const ADMIN_ROLES: Role[] = [Role.ADMIN, Role.OWNER];

export async function isAdmin(userId: string, organizationId: string) {
  try {
    const membership = await prisma.membership.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
    });

    if (!membership) {
      return false;
    }

    return ADMIN_ROLES.includes(membership.role);
  } catch {}
  return false;
}
