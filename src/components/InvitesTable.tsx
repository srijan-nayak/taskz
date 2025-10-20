import { Result } from "@/lib/definitions/generic";
import { use } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Check, MailIcon, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvitesList } from "@/lib/definitions/invitations";
import InviteStatusBadge from "./InviteStatusBadge";
import { InviteStatus } from "@/generated/prisma/enums";
import InviteActions from "./InviteActions";

export default function InvitesTable({
  invitesListPromise,
}: {
  invitesListPromise: Promise<Result<InvitesList, string>>;
}) {
  const result = use(invitesListPromise);

  return result.ok ? (
    result.data.length !== 0 ? (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.orgName}</TableCell>
              <TableCell>{data.orgOwnerName}</TableCell>
              <TableCell>
                <InviteStatusBadge status={data.status} />
              </TableCell>
              <TableCell>
                {data.status === InviteStatus.TENTATIVE && (
                  <InviteActions orgId={data.id} />
                )}
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
          <EmptyDescription>
            You haven&apos;t been invited to join any organizations yet.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  ) : (
    <div className="bg-red-300 rounded-md p-5 text-red-800 text-center">
      Failed to fetch invitations! Please try again later.
    </div>
  );
}
