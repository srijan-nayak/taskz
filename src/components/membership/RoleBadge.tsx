import { Role } from "@/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";

export default function RoleBadge({ role }: { role: Role }) {
  switch (role) {
    case Role.ADMIN:
      return (
        <Badge className="w-20" variant="destructive">
          Admin
        </Badge>
      );
    case Role.OWNER:
      return (
        <Badge className="w-20" variant="default">
          Owner
        </Badge>
      );
    default:
      return (
        <Badge className="w-20" variant="secondary">
          Member
        </Badge>
      );
  }
}
