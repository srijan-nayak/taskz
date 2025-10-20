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
import InviteMemberForm from "@/components/InviteMemberForm";
import { useParams } from "next/navigation";
import { inviteMember } from "@/actions/organization";

export default function InviteMember() {
  const [open, setOpen] = useState(false);
  const { orgId } = useParams<{ orgId: string }>();
  const [state, action, pending] = useActionState(inviteMember, {
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
          <CirclePlus /> <span>Invite Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite someone to join your organization</DialogTitle>
        </DialogHeader>
        <InviteMemberForm {...{ state, action, pending, orgId }} />
      </DialogContent>
    </Dialog>
  );
}
