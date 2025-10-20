"use server";

import { Role } from "@/generated/prisma/enums";
import { isMember } from "@/lib/authorizatin";
import { Result } from "@/lib/definitions/generic";
import {
  OrganizationFormSchema,
  OrganizationFormState,
  OrgsList,
  UserOrgDetails,
} from "@/lib/definitions/organization";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function createOrganization(
  _state: OrganizationFormState,
  data: FormData | null
): Promise<OrganizationFormState> {
  if (!data) {
    return { success: false };
  }

  const session = await verifySession();
  if (!session) {
    return redirect("/login");
  }

  const { userId } = session;

  const validatedFields = OrganizationFormSchema.safeParse({
    name: data.get("name"),
    id: data.get("id"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      name: data.get("name")?.toString(),
      id: data.get("id")?.toString(),
      success: false,
    };
  }

  const { id, name } = validatedFields.data;

  try {
    if (id) {
      const organization = await prisma.organization.findUnique({
        where: { id },
      });

      if (organization) {
        return {
          errors: {
            id: ["ID already allocaetd for another org"],
          },
          success: false,
          name,
          id,
        };
      }
    }

    await prisma.organization.create({
      data: {
        ...(id && { id }),
        name,
        createdById: session.userId,
        members: {
          create: {
            userId,
            role: Role.OWNER,
          },
        },
      },
    });

    revalidatePath("/home/organizations");
    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      message: "Failed to create organization! Try again later",
      success: false,
      name,
      id,
    };
  }
}

export async function getOrganizations(): Promise<Result<OrgsList, string>> {
  const session = await verifySession();
  if (!session) {
    return redirect("/login");
  }

  const { userId } = session;

  try {
    const data = await prisma.organization.findMany({
      where: { members: { some: { userId } } },
      select: {
        id: true,
        name: true,
        createdBy: { select: { name: true } },
        members: { where: { userId }, select: { role: true } },
      },
    });

    const orgList = data.map((r) => ({
      id: r.id,
      name: r.name,
      ownerName: r.createdBy.name,
      role: r.members[0]?.role || Role.MEMBER,
    }));

    return { ok: true, data: orgList };
  } catch (err) {
    console.log("Failed to query organizations", err);
    return { ok: false, err: "Failed to query organizations" };
  }
}

export async function getUserOrgDetails(
  orgId: string
): Promise<Result<UserOrgDetails, string>> {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const { userId } = session;

  const isAuthorized = await isMember(userId, orgId);
  if (!isAuthorized) {
    redirect("/home/organizations");
  }

  try {
    const orgDetails = await prisma.membership.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId: orgId,
        },
      },
      select: {
        role: true,
        organization: {
          select: {
            name: true,
            createdBy: { select: { name: true } },
          },
        },
      },
    });
    if (!orgDetails) {
      return { ok: false, err: "Failed to fetch organization details" };
    }

    return {
      ok: true,
      data: {
        orgId,
        orgName: orgDetails.organization.name,
        ownerName: orgDetails.organization.createdBy.name,
        userRole: orgDetails.role,
      },
    };
  } catch (err) {
    console.error("Filed to fetch organization details", err);
    return { ok: false, err: "Filed to fetch organization details" };
  }
}
