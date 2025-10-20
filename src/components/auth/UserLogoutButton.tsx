"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import { LogOut } from "lucide-react";
import { useActionState } from "react";

export default function UserLogoutButton() {
  const user = useUser();
  const [, action, pending] = useActionState(logout, null);

  return (
    <form className="flex justify-between items-center" action={action}>
      {user?.name}
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
