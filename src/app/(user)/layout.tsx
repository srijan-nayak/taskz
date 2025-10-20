import { getUserDetails } from "@/actions/auth";
import UserPromiseProvider from "@/providers/UserPromiseProvider";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  const userDetailsPromise = getUserDetails();

  return (
    <UserPromiseProvider promise={userDetailsPromise}>
      {children}
    </UserPromiseProvider>
  );
}
