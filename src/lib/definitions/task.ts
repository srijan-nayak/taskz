import { TaskStatus } from "@/generated/prisma/enums";
import z from "zod";

export type TasksList = {
  id: number;
  title: string;
  status: TaskStatus;
}[];

export const TaskFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be more than 2 characters" })
    .max(50, "Title can't be more than 50 characters"),
  description: z
    .string()
    .max(250, "Description can't be more than 250 characters"),
  orgId: z.string(),
  projectId: z.string(),
});

export type TaskFormState = {
  success: boolean;
  errors?: {
    title?: string[];
    description?: string[];
  };
  message?: string;
  title?: string;
  description?: string;
};

export const TaskStatusFormSchema = z.object({
  orgId: z.string(),
  projectId: z.string(),
  taskId: z.coerce.number(),
  status: z.enum(TaskStatus),
});
