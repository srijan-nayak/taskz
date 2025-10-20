import { isMember } from "@/lib/authorizatin";
import { Result } from "@/lib/definitions/generic";
import { MembersList } from "@/lib/definitions/membership";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getMembers(
  organizationId: string
): Promise<Result<MembersList, string>> {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  const { userId } = session;

  const isAuthorized = await isMember(userId, organizationId);
  if (!isAuthorized) {
    redirect("/home/organizations");
  }

  try {
    const members = await prisma.membership.findMany({
      where: { organizationId },
      select: {
        userId: true,
        user: { select: { name: true } },
        role: true,
      },
    });

    const data: MembersList = members.map((r) => ({
      id: r.userId,
      name: r.user.name,
      role: r.role,
    }));
    return { ok: true, data };
  } catch (err) {
    console.error("Failed to fetch members", err);
    return { ok: false, err: "Failed to fetch members" };
  }
}
