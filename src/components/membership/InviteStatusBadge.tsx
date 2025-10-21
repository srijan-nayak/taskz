import { InviteStatus } from "@/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";

export default function InviteStatusBadge({
  status,
}: {
  status: InviteStatus;
}) {
  switch (status) {
    case InviteStatus.REJECTED:
      return (
        <Badge className="w-20" variant="destructive">
          Rejected
        </Badge>
      );
    case InviteStatus.ACCEPTED:
      return (
        <Badge className="w-20" variant="default">
          Accepted
        </Badge>
      );
    default:
      return (
        <Badge className="w-20" variant="secondary">
          Tentative
        </Badge>
      );
  }
}
