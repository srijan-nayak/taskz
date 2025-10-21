"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Role } from "@/generated/prisma/enums";
import useOrganization from "@/hooks/useOrganization";
import {
  giveAdminStatus,
  removeMember,
  revokeAdminStatus,
} from "@/actions/membership";

export default function MemberActions({
  memberId,
  memberRole,
}: {
  memberId: string;
  memberRole: Role;
}) {
  const [, makeAdminAction, adminPending] = useActionState(
    giveAdminStatus,
    null
  );
  const [, makeMemberAction, memberPending] = useActionState(
    revokeAdminStatus,
    null
  );
  const [, removeMemberAction, removePending] = useActionState(
    removeMember,
    null
  );

  const orgData = useOrganization();

  if (!orgData || memberRole == Role.OWNER) {
    return <></>;
  }

  const { orgId } = orgData;

  return (
    <div className="flex items-center gap-2">
      <form
        action={memberRole === Role.MEMBER ? makeAdminAction : makeMemberAction}
      >
        <Input hidden name="member-id" type="text" value={memberId} readOnly />
        <Input hidden name="org-id" type="text" value={orgId} readOnly />
        <Button
          className="cursor-pointer w-36"
          type="submit"
          disabled={adminPending || memberPending}
          size="sm"
          variant={memberRole === Role.MEMBER ? "default" : "secondary"}
        >
          {memberRole === Role.MEMBER ? "Make Admin" : "Make Member"}
        </Button>
      </form>
      <form action={removeMemberAction}>
        <Input hidden name="member-id" type="text" value={memberId} readOnly />
        <Input hidden name="org-id" type="text" value={orgId} readOnly />
        <Button
          className="cursor-pointer"
          title="Remove member"
          variant="destructive"
          size="icon-sm"
          disabled={removePending}
        >
          <X />
        </Button>
      </form>
    </div>
  );
}
