import { Result } from "@/lib/definitions/generic";
import { OrgsList } from "@/lib/definitions/organization";
import { use } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Building, Mail } from "lucide-react";
import CreateOrg from "@/components/organization/CreateOrg";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RoleBadge from "@/components/membership/RoleBadge";

export default function OrgTable({
  orgsListPromise,
}: {
  orgsListPromise: Promise<Result<OrgsList, string>>;
}) {
  const result = use(orgsListPromise);

  return result.ok ? (
    result.data.length !== 0 ? (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.map((data) => (
            <TableRow key={data.id}>
              <TableCell>
                <Button size="sm" variant="secondary" asChild>
                  <Link href={`/organization/${data.id}/projects`}>
                    {data.name}
                  </Link>
                </Button>
              </TableCell>
              <TableCell>{data.ownerName}</TableCell>
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
            <Building />
          </EmptyMedia>
          <EmptyTitle>No organizations</EmptyTitle>
          <EmptyDescription>
            You aren&apos;t part of any organizations yet.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-3">
            <CreateOrg />
            <Button variant="secondary" asChild>
              <Link href="/invites">
                <Mail /> <span>Join through invites</span>
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    )
  ) : (
    <div className="bg-red-300 rounded-md p-5 text-red-800 text-center">
      Failed to fetch organizations! Please try again later.
    </div>
  );
}
