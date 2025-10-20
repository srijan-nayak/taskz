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
import ProjectForm from "./ProjectForm";
import { createProject } from "@/actions/project";

export default function CreateProject() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createProject, {
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
          <CirclePlus /> <span>Create Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
        </DialogHeader>
        <ProjectForm {...{ state, action, pending }} />
      </DialogContent>
    </Dialog>
  );
}
