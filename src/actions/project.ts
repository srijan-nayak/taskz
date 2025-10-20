"use server";

import { isAdmin, isMember } from "@/lib/authorizatin";
import { Result } from "@/lib/definitions/generic";
import {
  ProjectFormSchema,
  ProjectFormState,
  ProjectsList,
} from "@/lib/definitions/project";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getProjects(
  organizationId: string
): Promise<Result<ProjectsList, string>> {
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
    const data = await prisma.project.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });

    return { ok: true, data };
  } catch (err) {
    console.error("Failed to fetch projects", err);
    return { ok: false, err: "Failed to fetch members" };
  }
}

export async function createProject(
  _state: ProjectFormState,
  data: FormData | null
): Promise<ProjectFormState> {
  if (!data) {
    return { success: false };
  }

  const session = await verifySession();
  if (!session) {
    return redirect("/login");
  }
  const { userId } = session;

  const validatedFields = ProjectFormSchema.safeParse({
    name: data.get("name"),
    id: data.get("id"),
    orgId: data.get("org-id"),
  });
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      name: data.get("name")?.toString(),
      id: data.get("id")?.toString(),
      success: false,
    };
  }
  const { name, orgId, id } = validatedFields.data;

  const isAuthorized = await isAdmin(userId, orgId);
  if (!isAuthorized) {
    redirect("home/organizations");
  }

  try {
    if (id) {
      const project = await prisma.project.findUnique({
        where: { id },
      });

      if (project) {
        return {
          errors: {
            id: ["ID already allocted for another project"],
          },
          success: false,
          name,
          id,
        };
      }
    }

    await prisma.project.create({
      data: {
        ...(id && { id }),
        name,
        organizationId: orgId,
      },
    });

    revalidatePath(`/organization/${orgId}/projects`);
    return { success: true };
  } catch (err) {
    console.error("Failed to create project", err);
    return {
      message: "Failed to create project! Try again later",
      success: false,
      name,
      id,
    };
  }
}
