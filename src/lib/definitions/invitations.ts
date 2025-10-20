import { InviteStatus } from "@/generated/prisma/enums";
import { z } from "zod";

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

export type InvitesList = {
  id: string;
  orgName: string;
  orgOwnerName: string;
  status: InviteStatus;
}[];

export const InviteActionSchema = z.object({
  orgId: z.string(),
});

export type OrgInvitesList = {
  memberId: string;
  memberName: string;
  status: InviteStatus;
}[];
