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
import OrganizationForm from "@/components/organization/OrganizationForm";
import { startTransition, useActionState, useEffect, useState } from "react";
import { createOrganization } from "@/actions/organization";

export default function CreateOrg() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createOrganization, {
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
          <CirclePlus /> <span>Create Organization</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new organization</DialogTitle>
        </DialogHeader>
        <OrganizationForm {...{ state, action, pending }} />
      </DialogContent>
    </Dialog>
  );
}
