"use server";

import { Role } from "@/generated/prisma/enums";
import { isAdmin, isMember } from "@/lib/authorizatin";
import { Result } from "@/lib/definitions/generic";
import { MemberActionSchema, MembersList } from "@/lib/definitions/membership";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
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

export async function giveAdminStatus(_state: null, data: FormData) {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  const { userId } = session;

  const validatedFields = MemberActionSchema.safeParse({
    orgId: data.get("org-id"),
    memberId: data.get("member-id"),
  });
  if (!validatedFields.success) {
    return null;
  }

  const { memberId, orgId } = validatedFields.data;

  const isAuthorized = await isAdmin(userId, orgId);
  if (!isAuthorized) {
    redirect("/home/organizations");
  }

  try {
    await prisma.$transaction(async () => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { name: true },
      });
      const member = await prisma.user.findUniqueOrThrow({
        where: { id: memberId },
        select: { name: true },
      });

      await prisma.membership.update({
        where: {
          userId_organizationId: { userId: memberId, organizationId: orgId },
          role: { not: Role.OWNER },
        },
        data: { role: Role.ADMIN },
      });
      await prisma.activity.create({
        data: {
          organizationId: orgId,
          description: `${user.name} made ${member.name} an admin`,
        },
      });
    });
    revalidatePath(`/organizations/${orgId}/members`);
  } catch (err) {
    console.error("Failed to give admin status to member", err);
  }

  return null;
}

export async function revokeAdminStatus(_state: null, data: FormData) {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  const { userId } = session;

  const validatedFields = MemberActionSchema.safeParse({
    orgId: data.get("org-id"),
    memberId: data.get("member-id"),
  });
  if (!validatedFields.success) {
    return null;
  }

  const { memberId, orgId } = validatedFields.data;

  const isAuthorized = await isAdmin(userId, orgId);
  if (!isAuthorized) {
    redirect("/home/organizations");
  }

  try {
    await prisma.$transaction(async () => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { name: true },
      });
      const member = await prisma.user.findUniqueOrThrow({
        where: { id: memberId },
        select: { name: true },
      });

      await prisma.membership.update({
        where: {
          userId_organizationId: { userId: memberId, organizationId: orgId },
          role: { not: Role.OWNER },
        },
        data: { role: Role.MEMBER },
      });
      await prisma.activity.create({
        data: {
          organizationId: orgId,
          description: `${user.name} made ${member.name} a member`,
        },
      });
    });
    revalidatePath(`/organizations/${orgId}/members`);
  } catch (err) {
    console.error("Failed to give admin status to member", err);
  }

  return null;
}

export async function removeMember(_state: null, data: FormData) {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  const { userId } = session;

  const validatedFields = MemberActionSchema.safeParse({
    orgId: data.get("org-id"),
    memberId: data.get("member-id"),
  });
  if (!validatedFields.success) {
    return null;
  }

  const { memberId, orgId } = validatedFields.data;

  const isAuthorized = await isAdmin(userId, orgId);
  if (!isAuthorized) {
    redirect("/home/organizations");
  }

  try {
    await prisma.$transaction(async () => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { name: true },
      });
      const member = await prisma.user.findUniqueOrThrow({
        where: { id: memberId },
        select: { name: true },
      });

      await prisma.membership.delete({
        where: {
          userId_organizationId: { userId: memberId, organizationId: orgId },
          role: { not: Role.OWNER },
        },
      });
      await prisma.activity.create({
        data: {
          organizationId: orgId,
          description: `${user.name} removed ${member.name} from the organization`,
        },
      });
    });
    revalidatePath(`/organizations/${orgId}/members`);
  } catch (err) {
    console.error("Failed to give admin status to member", err);
  }

  return null;
}
