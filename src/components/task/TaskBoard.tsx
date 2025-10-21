"use client";

import { TaskStatus } from "@/generated/prisma/enums";
import { Result } from "@/lib/definitions/generic";
import { TasksList } from "@/lib/definitions/task";
import { use } from "react";
import TaskBoardColumn from "@/components/task/TaskBoardColumn";

export default function TaskBoard({
  tasksListPromise,
}: {
  tasksListPromise: Promise<Result<TasksList, string>>;
}) {
  const result = use(tasksListPromise);
  if (!result.ok) {
    return (
      <div className="bg-red-300 rounded-md p-5 text-red-800 text-center">
        Failed to fetch tasks! Please try again later.
      </div>
    );
  }

  const { data } = result;
  const todoTasks = data.filter((t) => t.status == TaskStatus.TODO);
  const inProgressTasks = data.filter(
    (t) => t.status == TaskStatus.IN_PROGRESS
  );
  const doneTasks = data.filter((t) => t.status == TaskStatus.DONE);

  return (
    <div className="max-w-full overflow-x-scroll">
      <div className="flex gap-3 min-h-screen bg-secondary p-4 rounded-xl min-w-5xl">
        <TaskBoardColumn title="Todo" tasks={todoTasks} />
        <TaskBoardColumn title="In-Progress" tasks={inProgressTasks} />
        <TaskBoardColumn title="Done" tasks={doneTasks} />
      </div>
    </div>
  );
}
