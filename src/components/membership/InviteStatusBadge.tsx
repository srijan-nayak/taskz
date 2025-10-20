import { InviteStatus } from "@/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";

export default function InviteStatusBadge({ status }: { status: InviteStatus }) {
  switch (status) {
    case InviteStatus.REJECTED:
      return <Badge variant="destructive">Rejected</Badge>;
    case InviteStatus.ACCEPTED:
      return <Badge variant="default">Accepted</Badge>;
    default:
      return <Badge variant="secondary">Tentative</Badge>;
  }
}
