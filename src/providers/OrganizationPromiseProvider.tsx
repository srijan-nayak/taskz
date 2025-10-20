"use client";

import { Result } from "@/lib/definitions/generic";
import { UserOrgDetails } from "@/lib/definitions/organization";
import { createContext, ReactNode } from "react";

export const OrganizationPromiseContext = createContext<
  Promise<Result<UserOrgDetails, string>>
>(new Promise((res) => res({ ok: false, err: "" })));

export default function OrganizationPromiseProvider({
  promise,
  children,
}: {
  promise: Promise<Result<UserOrgDetails, string>>;
  children: ReactNode;
}) {
  return (
    <OrganizationPromiseContext.Provider value={promise}>
      {children}
    </OrganizationPromiseContext.Provider>
  );
}
