"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { startTransition, useActionState, useEffect, useState } from "react";
import TaskForm from "@/components/task/TaskForm";
import { createTask } from "@/actions/task";

export default function CreateTask() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createTask, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  useEffect(() => {
    startTransition(() => {
      action(null);
    });
  }, [open, action]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <CirclePlus /> <span>Create Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
        </DialogHeader>
        <TaskForm {...{ state, action, pending }} />
      </DialogContent>
    </Dialog>
  );
}
