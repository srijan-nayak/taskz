import { TaskStatus } from "@/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";

export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
  switch (status) {
    case TaskStatus.TODO:
      return (
        <Badge className="w-20" variant="destructive">
          Todo
        </Badge>
      );
    case TaskStatus.DONE:
      return (
        <Badge className="w-20" variant="default">
          Done
        </Badge>
      );
    default:
      return (
        <Badge className="w-20" variant="secondary">
          In-progress
        </Badge>
      );
  }
}
