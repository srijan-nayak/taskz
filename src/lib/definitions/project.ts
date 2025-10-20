import { TaskStatus } from "@/generated/prisma/enums";
import { z } from "zod";

export const ProjectFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be more than 2 characters" })
    .max(16, "Name cannot be more than 16 characters"),
  id: z
    .string()
    .regex(/^\S*$/, {
      message: "ID must contain only non-whitespace characters",
    })
    .optional(),
  orgId: z.string(),
});

export type ProjectFormState = {
  success: boolean;
  errors?: {
    name?: string[];
    id?: string[];
  };
  message?: string;
  name?: string;
  id?: string;
};

export type ProjectDetails = {
  id: string;
  name: string;
  status: TaskStatus;
};

export type ProjectsList = ProjectDetails[];
