"use client";

import { TaskStatus } from "@/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useActionState } from "react";
import { updateProjectStatus } from "@/actions/project";

export default function UpdateProjectStatus({
  status,
  projectId,
}: {
  status: TaskStatus;
  projectId: string;
}) {
  const { orgId } = useParams<{
    orgId: string;
  }>();

  const [, action, pending] = useActionState(updateProjectStatus, null);

  return (
    <form action={action}>
      <Input hidden name="org-id" type="text" defaultValue={orgId} readOnly />
      <Input
        hidden
        name="project-id"
        type="string"
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
            className="cursor-pointer w-36"
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
            className="cursor-pointer w-36"
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
            className="cursor-pointer w-36"
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
