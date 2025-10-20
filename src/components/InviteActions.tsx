"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { acceptInvite, rejectInvite } from "@/actions/invitations";
import { Input } from "./ui/input";

export default function InviteActions({ orgId }: { orgId: string }) {
  const [, acceptAction, acceptPending] = useActionState(acceptInvite, null);
  const [, rejectAction, rejectPending] = useActionState(rejectInvite, null);

  return (
    <div className="flex items-center gap-3">
      <form action={acceptAction}>
        <Input hidden name="org-id" type="text" value={orgId} readOnly />
        <Button
          className="cursor-pointer"
          title="Accept"
          size="icon"
          type="submit"
          disabled={acceptPending || rejectPending}
        >
          <Check />
        </Button>
      </form>
      <form action={rejectAction}>
        <Input hidden name="org-id" type="text" value={orgId} readOnly />
        <Button
          className="cursor-pointer"
          title="Reject"
          variant="destructive"
          size="icon"
          disabled={acceptPending || rejectPending}
        >
          <X />
        </Button>
      </form>
    </div>
  );
}
