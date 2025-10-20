import { TaskStatus } from "@/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";

export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
  switch (status) {
    case TaskStatus.TODO:
      return <Badge variant="destructive">Todo</Badge>;
    case TaskStatus.DONE:
      return <Badge variant="default">Done</Badge>;
    default:
      return <Badge variant="secondary">In-progress</Badge>;
  }
}
