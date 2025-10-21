"use client";

import { Result } from "@/lib/definitions/generic";
import { use } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderCode } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useOrganization from "@/hooks/useOrganization";
import { Role } from "@/generated/prisma/enums";
import { ProjectsList } from "@/lib/definitions/project";
import CreateProject from "@/components/project/CreateProject";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TaskStatusBadge from "@/components/task/TaskStatusBadge";
import UpdateProjectStatus from "./UpdateProjectStatus";

export default function ProjectsTable({
  projectsListPromise,
}: {
  projectsListPromise: Promise<Result<ProjectsList, string>>;
}) {
  const result = use(projectsListPromise);
  const org = useOrganization();

  return result.ok ? (
    result.data.length !== 0 ? (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            {org?.userRole !== Role.MEMBER && (
              <TableHead>Update Status</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.map((data) => (
            <TableRow key={data.id}>
              <TableCell>
                <Button size="sm" variant="secondary" asChild>
                  <Link href={`/project/${org?.orgId}/${data.id}/tasks`}>
                    {data.name}
                  </Link>
                </Button>
              </TableCell>
              <TableCell>
                <TaskStatusBadge status={data.status} />
              </TableCell>
              {org?.userRole !== Role.MEMBER && (
                <TableCell>
                  <UpdateProjectStatus
                    projectId={data.id}
                    status={data.status}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      <Empty className="outline">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderCode />
          </EmptyMedia>
          <EmptyTitle>No projects</EmptyTitle>
          <EmptyDescription>
            No projects have been created in this organization yet.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          {org?.userRole !== Role.MEMBER && <CreateProject />}
        </EmptyContent>
      </Empty>
    )
  ) : (
    <div className="bg-red-300 rounded-md p-5 text-red-800 text-center">
      Failed to fetch projects! Please try again later.
    </div>
  );
}
