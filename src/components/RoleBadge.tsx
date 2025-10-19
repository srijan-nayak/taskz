import { Role } from "@/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";

export default function RoleBadge({ role }: { role: Role }) {
  switch (role) {
    case Role.ADMIN:
      return <Badge variant="destructive">Admin</Badge>;
    case Role.OWNER:
      return <Badge variant="default">Owner</Badge>;
    default:
      return <Badge variant="secondary">Member</Badge>;
  }
}
