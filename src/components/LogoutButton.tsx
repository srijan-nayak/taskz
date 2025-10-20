"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { UserDetails } from "@/lib/definitions/auth";
import { Result } from "@/lib/definitions/generic";
import { LogOut } from "lucide-react";
import { use, useActionState } from "react";

export default function LogoutButton({
  userDataPromise,
}: {
  userDataPromise: Promise<Result<UserDetails, string>>;
}) {
  const result = use(userDataPromise);
  const [, action, pending] = useActionState(logout, null);

  return (
    <form className="flex justify-between items-center" action={action}>
      {result.ok && result.data.name}
      <Button
        variant="destructive"
        className="cursor-pointer"
        title="Log out"
        disabled={pending}
      >
        <LogOut />
      </Button>
    </form>
  );
}
