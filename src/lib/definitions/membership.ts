import { Role } from "@/generated/prisma/enums";
import z from "zod";

export type MembersList = {
  id: string;
  name: string;
  role: Role;
}[];

export const MemberActionSchema = z.object({
  orgId: z.string(),
  memberId: z.string(),
});
