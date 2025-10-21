"use server";

import { isMember } from "@/lib/authorizatin";
import { Result } from "@/lib/definitions/generic";
import {
  TaskFormSchema,
  TaskFormState,
  TasksList,
  TaskStatusFormSchema,
} from "@/lib/definitions/task";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function getTasks(
  organizationId: string,
  projectId: string
): Promise<Result<TasksList, string>> {
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
    const data = await prisma.task.findMany({
      where: { projectId, project: { organizationId } },
      select: { id: true, title: true, status: true },
      orderBy: { createAt: "desc" },
    });

    return { ok: true, data };
  } catch (err) {
    console.error("Failed to fetch tasks", err);
    return { ok: false, err: "Failed to fetch tasks" };
  }
}

export async function createTask(
  _state: TaskFormState,
  data: FormData | null
): Promise<TaskFormState> {
  if (!data) {
    return { success: false };
  }

  const session = await verifySession();
  if (!session) {
    return redirect("/login");
  }
  const { userId } = session;

  const validatedFields = TaskFormSchema.safeParse({
    title: data.get("title"),
    description: data.get("description"),
    orgId: data.get("org-id"),
    projectId: data.get("project-id"),
  });
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      title: data.get("title")?.toString(),
      description: data.get("description")?.toString(),
      success: false,
    };
  }

  const { title, description, orgId, projectId } = validatedFields.data;

  const isAuthorized = await isMember(userId, orgId);
  if (!isAuthorized) {
    redirect("home/organizations");
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId, organizationId: orgId },
    });

    if (project) {
      await prisma.task.create({
        data: {
          title,
          description,
          projectId,
        },
      });

      revalidatePath(`/project/${orgId}/${projectId}/tasks`);
      return { success: true };
    }
  } catch (err) {
    console.error("Failed to create task", err);
    return {
      message: "Failed to create task! Try again later",
      success: false,
      title,
      description,
    };
  }
  redirect(`/organization/${orgId}/projects`);
}

export async function updateTaskStatus(_state: null, data: FormData) {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }
  const { userId } = session;

  console.log(data.get("org-id")?.toString());
  console.log(data.get("project-id")?.toString());
  console.log(data.get("task-id")?.toString());
  console.log(data.get("status")?.toString());
  const validatedFields = TaskStatusFormSchema.safeParse({
    orgId: data.get("org-id"),
    projectId: data.get("project-id"),
    taskId: data.get("task-id"),
    status: data.get("status"),
  });
  if (!validatedFields.success) {
    return null;
  }

  const { orgId, projectId, taskId, status } = validatedFields.data;

  const isAuthorized = await isMember(userId, orgId);
  if (!isAuthorized) {
    redirect("/home/organizations");
  }

  try {
    await prisma.task.update({
      where: {
        id: taskId,
        projectId,
        project: { organizationId: orgId },
      },
      data: { status },
    });

    revalidatePath(`/project/${orgId}/${projectId}/tasks`);
  } catch (err) {
    console.error("Failed to update task status", err);
  }

  return null;
}
