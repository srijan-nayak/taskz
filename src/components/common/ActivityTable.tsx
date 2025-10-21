import { Result } from "@/lib/definitions/generic";
import { use } from "react";
import {
  Empty,
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
import { ActivityList } from "@/lib/definitions/activity";

export default function ActivityTable({
  activityListPromise,
}: {
  activityListPromise: Promise<Result<ActivityList, string>>;
}) {
  const result = use(activityListPromise);

  return result.ok ? (
    result.data.length !== 0 ? (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.description}</TableCell>
              <TableCell>{data.createdAt.toLocaleString()}</TableCell>
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
          <EmptyTitle>No activity</EmptyTitle>
        </EmptyHeader>
      </Empty>
    )
  ) : (
    <div className="bg-red-300 rounded-md p-5 text-red-800 text-center">
      Failed to fetch activity! Please try again later.
    </div>
  );
}
