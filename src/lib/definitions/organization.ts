import { Role } from "@/generated/prisma/enums";
import { z } from "zod";

export const OrganizationFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be more than 2 characters" })
    .max(24, "Name cannot be more than 24 characters"),
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

export type OrgsList = {
  id: string;
  name: string;
  ownerName: string;
  role: Role;
}[];

export const InviteMemberFormSchema = z.object({
  email: z.email({ message: "Email must be valid" }),
  orgId: z.string(),
});

export type InviteMemberFormState = {
  success: boolean;
  errors?: {
    email?: string[];
  };
  message?: string;
  email?: string;
};
