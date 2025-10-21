import { isMember } from "@/lib/authorizatin";
import { ActivityList } from "@/lib/definitions/activity";
import { Result } from "@/lib/definitions/generic";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getOrgActivity(
  organizationId: string,
  projectId?: string
): Promise<Result<ActivityList, string>> {
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
    const data = await prisma.activity.findMany({
      where: { organizationId, ...(projectId && { projectId }) },
      select: {
        id: true,
        description: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { ok: true, data };
  } catch (err) {
    console.error("Failed to fetch organization activity", err);
    return { ok: false, err: "Failed to fetch organization activity" };
  }
}
