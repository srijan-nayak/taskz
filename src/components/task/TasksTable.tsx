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
import TaskStatusBadge from "@/components/task/TaskStatusBadge";
import { TasksList } from "@/lib/definitions/task";
import CreateTask from "@/components/task/CreateTask";
import UpdateTaskStatus from "./UpdateTaskStatus";

export default function TasksTable({
  tasksListPromise,
}: {
  tasksListPromise: Promise<Result<TasksList, string>>;
}) {
  const result = use(tasksListPromise);

  return result.ok ? (
    result.data.length !== 0 ? (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data.map((data) => (
            <TableRow key={data.id}>
              <TableCell> {data.title} </TableCell>
              <TableCell>
                <TaskStatusBadge status={data.status} />
              </TableCell>
              <TableCell>
                <UpdateTaskStatus taskId={data.id} status={data.status} />
              </TableCell>
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
          <EmptyTitle>No Tasks</EmptyTitle>
          <EmptyDescription>
            No tasks have been created for this project yet.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <CreateTask />
        </EmptyContent>
      </Empty>
    )
  ) : (
    <div className="bg-red-300 rounded-md p-5 text-red-800 text-center">
      Failed to fetch tasks! Please try again later.
    </div>
  );
}
