import { Role } from "@/generated/prisma/enums";

export type MembersList = {
  id: string;
  name: string;
  role: Role;
}[];
