"use client";

import { TaskStatus } from "@/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useParams } from "next/navigation";
import { useActionState } from "react";
import { updateTaskStatus } from "@/actions/task";

export default function UpdateTaskStatus({
  status,
  taskId,
}: {
  status: TaskStatus;
  taskId: number;
}) {
  const { orgId, projectId } = useParams<{
    orgId: string;
    projectId: string;
  }>();

  const [, action, pending] = useActionState(updateTaskStatus, null);

  return (
    <form action={action}>
      <Input hidden name="org-id" type="text" defaultValue={orgId} readOnly />
      <Input
        hidden
        name="task-id"
        type="number"
        defaultValue={taskId}
        readOnly
      />
      <Input
        hidden
        name="project-id"
        type="text"
        defaultValue={projectId}
        readOnly
      />

      {status === TaskStatus.TODO && (
        <>
          <Input
            hidden
            name="status"
            type="text"
            defaultValue={TaskStatus.IN_PROGRESS}
            readOnly
          />
          <Button
            className="cursor-pointer"
            size="sm"
            variant="secondary"
            disabled={pending}
          >
            Mark in-progress
          </Button>
        </>
      )}

      {status === TaskStatus.IN_PROGRESS && (
        <>
          <Input
            hidden
            name="status"
            type="text"
            defaultValue={TaskStatus.DONE}
            readOnly
          />
          <Button
            className="cursor-pointer"
            size="sm"
            variant="default"
            disabled={pending}
          >
            Mark done
          </Button>
        </>
      )}

      {status === TaskStatus.DONE && (
        <>
          <Input
            hidden
            name="status"
            type="text"
            defaultValue={TaskStatus.TODO}
            readOnly
          />
          <Button
            className="cursor-pointer"
            size="sm"
            variant="outline"
            disabled={pending}
          >
            Mark todo
          </Button>
        </>
      )}
    </form>
  );
}
