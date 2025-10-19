import { z } from "zod";

export const OrganizationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be more than 2 characters" }),
  id: z.string().optional(),
});

export type OrganizationFormState = {
  success: boolean;
  errors?: {
    name?: string[];
    id?: string[];
  };
  message?: string;
  name?: string;
  id?: string;
};
