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
import { MembersList } from "@/lib/definitions/membership";
import RoleBadge from "./RoleBadge";

export default function MembersTable({
  membersListPromise,
}: {
  membersListPromise: Promise<Result<MembersList, string>>;
}) {
  const result = use(membersListPromise);

  return result.ok ? (
    result.data.length !== 0 ? (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.name}</TableCell>
              <TableCell>
                <RoleBadge role={data.role} />
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
          <EmptyTitle>No members</EmptyTitle>
          <EmptyDescription>
            No members have joined your organization yet.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  ) : (
    <div className="bg-red-300 rounded-md p-5 text-red-800 text-center">
      Failed to fetch members! Please try again later.
    </div>
  );
}
