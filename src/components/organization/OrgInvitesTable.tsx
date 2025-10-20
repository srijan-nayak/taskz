import { Result } from "@/lib/definitions/generic";
import { use } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MailIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrgInvitesList } from "@/lib/definitions/invitations";
import InviteStatusBadge from "@/components/membership/InviteStatusBadge";

export default function OrgInvitesTable({
  orgInvitesListPromise,
}: {
  orgInvitesListPromise: Promise<Result<OrgInvitesList, string>>;
}) {
  const result = use(orgInvitesListPromise);

  return result.ok ? (
    result.data.length !== 0 ? (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.map((data) => (
            <TableRow key={data.memberId}>
              <TableCell>{data.memberName}</TableCell>
              <TableCell>
                <InviteStatusBadge status={data.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      <Empty className="outline">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MailIcon />
          </EmptyMedia>
          <EmptyTitle>No invites</EmptyTitle>
          <EmptyDescription>No members have been invited yet.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  ) : (
    <div className="bg-red-300 rounded-md p-5 text-red-800 text-center">
      Failed to fetch invitations! Please try again later.
    </div>
  );
}
