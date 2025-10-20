"use client";

import { UserDetails } from "@/lib/definitions/auth";
import { Result } from "@/lib/definitions/generic";
import { createContext, ReactNode } from "react";

export const UserPromiseContext = createContext<
  Promise<Result<UserDetails, string>>
>(new Promise((res) => res({ ok: false, err: "" })));

export default function UserPromiseProvider({
  promise,
  children,
}: {
  promise: Promise<Result<UserDetails, string>>;
  children: ReactNode;
}) {
  return (
    <UserPromiseContext.Provider value={promise}>
      {children}
    </UserPromiseContext.Provider>
  );
}
