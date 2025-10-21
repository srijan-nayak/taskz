"use server";

import { InviteStatus } from "@/generated/prisma/enums";
import { isAdmin } from "@/lib/authorizatin";
import { Result } from "@/lib/definitions/generic";
import {
  InviteMemberFormState,
  InviteMemberFormSchema,
  InvitesList,
  InviteActionSchema,
  OrgInvitesList,
} from "@/lib/definitions/invitations";
import prisma from "@/lib/prisma";
import { verifySession, clearSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function inviteMember(
  _state: InviteMemberFormState,
  data: FormData | null
): Promise<InviteMemberFormState> {
  if (!data) {
    return { success: false };
  }

  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  const { userId } = session;

  const validatedFields = InviteMemberFormSchema.safeParse({
    email: data.get("email"),
    orgId: data.get("org-id"),
  });
  if (!validatedFields.success) {
    return {
      success: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
      email: data.get("email")?.toString(),
    };
  }
  const { email, orgId } = validatedFields.data;

  const isAuthorized = await isAdmin(session.userId, orgId);
  if (!isAuthorized) {
    await clearSession();
    redirect("/login");
  }

  try {
    const response = await prisma.$transaction(async () => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { name: true },
      });
      const member = await prisma.user.findUnique({
        where: { email },
        select: { id: true, name: true },
      });
      if (!member) {
        return {
          success: false,
          email,
          message: "No user exists for the given mail",
        };
      }

      await prisma.invitations.create({
        data: {
          userId: member.id,
          organizationId: orgId,
        },
      });
      await prisma.activity.create({
        data: {
          organizationId: orgId,
          description: `${user.name} has invited ${member.name} to join the organization`,
        },
      });
    });
    if (response) {
      return response;
    }
  } catch (err) {
    console.log("Failed to create invitation", err);
    return {
      success: false,
      message: "Failed to send invite! Please try again later",
      email,
    };
  }

  return { success: true };
}

export async function getUserInvitations(): Promise<
  Result<InvitesList, string>
> {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const { userId } = session;

  try {
    const invites = await prisma.invitations.findMany({
      where: { userId },
      select: {
        organization: {
          select: {
            id: true,
            name: true,
            createdBy: { select: { name: true } },
          },
        },
        status: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const data: InvitesList = invites.map((r) => ({
      id: r.organization.id,
      orgName: r.organization.name,
      orgOwnerName: r.organization.createdBy.name,
      status: r.status,
    }));

    return { ok: true, data };
  } catch (err) {
    console.error("Failed to fetch user's invitations", err);
    return { ok: false, err: "Failed to fetch user's invitations" };
  }
}

export async function acceptInvite(
  _state: null,
  data: FormData
): Promise<null> {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  const { userId } = session;

  const validatedFields = InviteActionSchema.safeParse({
    orgId: data.get("org-id"),
  });
  if (!validatedFields.success) {
    return null;
  }

  const { orgId } = validatedFields.data;

  try {
    await prisma.$transaction(async () => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { name: true },
      });
      await prisma.invitations.update({
        where: {
          userId_organizationId: {
            userId,
            organizationId: orgId,
          },
        },
        data: { status: InviteStatus.ACCEPTED },
      });

      await prisma.membership.create({
        data: {
          userId,
          organizationId: orgId,
        },
      });

      await prisma.activity.create({
        data: {
          organizationId: orgId,
          description: `${user.name} has joined the organization`,
        },
      });
    });
    revalidatePath(`/home/invites`);
  } catch (err) {
    console.error("Failed to accept invite", err);
  }

  return null;
}

export async function rejectInvite(
  _state: null,
  data: FormData
): Promise<null> {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  const { userId } = session;

  const validatedFields = InviteActionSchema.safeParse({
    orgId: data.get("org-id"),
  });
  if (!validatedFields.success) {
    return null;
  }

  const { orgId } = validatedFields.data;

  try {
    await prisma.invitations.update({
      where: {
        userId_organizationId: {
          userId,
          organizationId: orgId,
        },
      },
      data: { status: InviteStatus.REJECTED },
    });

    revalidatePath(`/home/invites`);
  } catch (err) {
    console.error("Failed to reject invite", err);
  }

  return null;
}

export async function getOrganizationInvitations(
  orgId: string
): Promise<Result<OrgInvitesList, string>> {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  const { userId } = session;

  const isAuthorized = await isAdmin(userId, orgId);
  if (!isAuthorized) {
    redirect("/home/organizations");
  }

  try {
    const invites = await prisma.invitations.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: "desc" },
      select: {
        userId: true,
        user: { select: { name: true } },
        status: true,
      },
    });
    const data: OrgInvitesList = invites.map((r) => ({
      memberId: r.userId,
      memberName: r.user.name,
      status: r.status,
    }));

    return { ok: true, data };
  } catch (err) {
    console.error("Failed to fetch organization invites", err);
    return { ok: false, err: "Failed to fetch organization invites" };
  }
}
